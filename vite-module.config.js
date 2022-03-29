import path from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'lib/module.ts'),
      name: 'wochit',
      fileName: (format) => `wochit-embedded.${format}.js`,
    },
  },
});
