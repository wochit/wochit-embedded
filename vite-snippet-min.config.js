import path from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    emptyOutDir: false,
    outDir: 'dist-snippet',
    minify: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'lib/snippet.ts'),
      name: '__unused__',
      formats: ['iife'],
      fileName: (format) => `wochit-snippet.${format}.min.js`,
    },
  },
});
