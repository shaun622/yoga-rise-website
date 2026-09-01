import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        survey: resolve(import.meta.dirname, 'yoga-teacher-industry-survey/index.html'),
      },
    },
  },
});
