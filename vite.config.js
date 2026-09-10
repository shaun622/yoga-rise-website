import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { articlesPlugin } from './build/articles-plugin.js';
import { contentPageInputs, contentPagesPlugin } from './build/content-pages-plugin.js';

export default defineConfig(({ mode }) => {
  const review = mode === 'review';
  return {
    plugins: [contentPagesPlugin({ review }), articlesPlugin()],
    build: {
      assetsInlineLimit: 0,
      outDir: review ? 'dist-review' : 'dist',
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, 'index.html'),
          blog: resolve(import.meta.dirname, 'blog/index.html'),
          incomeCalculator: resolve(import.meta.dirname, 'yoga-teacher-income-calculator/index.html'),
          survey: resolve(import.meta.dirname, 'yoga-teacher-industry-survey/index.html'),
          surveyThankYou: resolve(
            import.meta.dirname,
            'yoga-teacher-industry-survey/thank-you/index.html',
          ),
          ...contentPageInputs(import.meta.dirname, { review }),
        },
      },
    },
  };
});
