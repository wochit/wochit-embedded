import path from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist-snippet',
    minify: false,
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'lib/snippet.ts'),
      name: '__unused__',
      formats: ['iife'],
      fileName: (format) => `wochit-snippet.${format}.js`,
    },
  },
});
