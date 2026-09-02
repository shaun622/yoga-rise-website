const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mailerLiteApiUrl = 'https://connect.mailerlite.com/api/subscribers';

const signupSources = {
  website: {
    groupId: '197361749519762447',
    backupSource: 'mailerlite-website',
  },
  survey: {
    groupId: '197286125900924756',
    backupSource: 'mailerlite-survey',
  },
};

function json(payload, status = 200) {
  return Response.json(payload, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function clean(value, maxLength) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, maxLength + 1);
}

function hasErrorField(errorFields, fieldName) {
  return errorFields.some((field) => field === fieldName || field.startsWith(`${fieldName}.`));
}

function publicMailerLiteError(status, errorFields) {
  if (status === 401) {
    return {
      message: 'The signup connection is not authorised with MailerLite. Please let us know.',
      status: 503,
    };
  }
  if (status === 403) {
    return {
      message: 'MailerLite denied access to the mailing list. Please let us know.',
      status: 503,
    };
  }
  if (status === 404 || (status === 422 && hasErrorField(errorFields, 'groups'))) {
    return {
      message: 'The selected MailerLite group is unavailable. Please let us know.',
      status: 503,
    };
  }
  if (status === 422 && hasErrorField(errorFields, 'email')) {
    return { message: 'Please enter a valid email address.', status: 422 };
  }
  if (status === 422) {
    return {
      message: 'MailerLite could not accept those details. Please check them and try again.',
      status: 422,
    };
  }
  if (status === 429) {
    return {
      message: 'Too many signup attempts. Please wait a moment and try again.',
      status: 429,
    };
  }
  if (status >= 500) {
    return {
      message: 'MailerLite is temporarily unavailable. Please try again shortly.',
      status: 503,
    };
  }
  return {
    message: `MailerLite rejected the signup request (error ${status}). Please let us know.`,
    status: 502,
  };
}

async function readMailerLiteError(response) {
  try {
    const payload = await response.json();
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return { message: '', fields: [] };
    }

    const message = clean(payload.message, 300).replace(
      /[^\s@]+@[^\s@]+\.[^\s@]+/g,
      '[email redacted]',
    );
    const fields =
      payload.errors && typeof payload.errors === 'object' && !Array.isArray(payload.errors)
        ? Object.keys(payload.errors).slice(0, 20)
        : [];

    return { message, fields };
  } catch {
    return { message: '', fields: [] };
  }
}

function withReference(message, requestId) {
  return `${message} Reference: ${requestId.slice(0, 8).toUpperCase()}.`;
}

async function storeSubscriberBackup(env, email, source, requestId) {
  if (!env.SUBSCRIBERS_DB) return;

  try {
    await env.SUBSCRIBERS_DB.prepare(
      `INSERT INTO subscribers (email, source)
       VALUES (?, ?)
       ON CONFLICT(email) DO UPDATE SET source = excluded.source`,
    )
      .bind(email, source)
      .run();
  } catch (error) {
    console.error(
      JSON.stringify({
        event: 'subscriber_backup_failed',
        requestId,
        source,
        error: error instanceof Error ? clean(error.message, 300) : 'Unknown D1 error',
      }),
    );
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  let body;

  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: 'Please check your details and try again.' }, 400);
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ ok: false, message: 'Please check your details and try again.' }, 400);
  }

  // Treat the hidden honeypot as a successful no-op so bots receive no useful signal.
  if (body.company) return json({ ok: true });

  const requestId = crypto.randomUUID();
  const sourceName = clean(body.source || 'website', 20).toLowerCase();
  const source = signupSources[sourceName];
  const firstName = clean(body.firstName ?? body.fullName, 120);
  const lastName = clean(body.lastName, 120);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 50);

  if (!source) {
    return json({ ok: false, message: 'This signup form is not available.' }, 400);
  }
  if (!firstName || firstName.length > 120) {
    return json({ ok: false, message: 'Please enter your first name.' }, 400);
  }
  if (lastName.length > 120) {
    return json({ ok: false, message: 'Please check your last name.' }, 400);
  }
  if (!email || email.length > 254 || !emailPattern.test(email)) {
    return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
  }
  if (phone.length > 50) {
    return json({ ok: false, message: 'Please check your phone number.' }, 400);
  }
  if (!env.MAILER_API_TOKEN) {
    console.error(
      JSON.stringify({
        event: 'mailerlite_signup_configuration_error',
        requestId,
        source: sourceName,
        reason: 'MAILER_API_TOKEN is missing',
      }),
    );
    return json(
      {
        ok: false,
        message: withReference(
          'The signup connection is not configured. Please let us know.',
          requestId,
        ),
      },
      503,
    );
  }

  const fields = { name: firstName };
  if (lastName) fields.last_name = lastName;
  if (phone) fields.phone = phone;

  let mailerLiteResponse;
  try {
    mailerLiteResponse = await fetch(mailerLiteApiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${env.MAILER_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        fields,
        groups: [source.groupId],
      }),
    });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: 'mailerlite_signup_network_error',
        requestId,
        source: sourceName,
        error: error instanceof Error ? clean(error.message, 300) : 'Unknown network error',
      }),
    );
    return json(
      {
        ok: false,
        message: withReference(
          'MailerLite could not be reached. Please try again shortly.',
          requestId,
        ),
      },
      502,
    );
  }

  if (!mailerLiteResponse.ok) {
    const mailerLiteError = await readMailerLiteError(mailerLiteResponse);
    const publicError = publicMailerLiteError(
      mailerLiteResponse.status,
      mailerLiteError.fields,
    );

    console.error(
      JSON.stringify({
        event: 'mailerlite_signup_rejected',
        requestId,
        source: sourceName,
        status: mailerLiteResponse.status,
        upstreamMessage: mailerLiteError.message,
        errorFields: mailerLiteError.fields,
      }),
    );
    return json(
      {
        ok: false,
        message: withReference(publicError.message, requestId),
      },
      publicError.status,
    );
  }

  context.waitUntil(storeSubscriberBackup(env, email, source.backupSource, requestId));
  return json({ ok: true });
}
