import path from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
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
