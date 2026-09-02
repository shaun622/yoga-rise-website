const requestTimeoutMs = 15000;

export async function submitSignup(details) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
      signal: controller.signal,
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) {
      throw new Error(result.message || 'Signup is temporarily unavailable.');
    }

    return result;
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error('Signup took too long. Please try again.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
