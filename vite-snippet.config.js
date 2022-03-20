import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'lib/snippet.ts'),
      name: '__wt',
      formats: ['iife'],
      fileName: (format) => `wochit-snippet.${format}.js`,
    },
  },
});
