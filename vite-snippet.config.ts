import { resolve } from 'path';
import { defineConfig } from 'vite';
import { version } from './package.json';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  build: {
    emptyOutDir: false,
    outDir: 'dist-snippet',
    minify: false,
    sourcemap: false,
    lib: {
      entry: resolve(__dirname, 'lib/snippet.ts'),
      name: '__unused__',
      formats: ['iife'],
      fileName: (format) => `wochit-snippet.${format}.js`,
    },
  },
});
