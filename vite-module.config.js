import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'lib/module.ts'),
      name: 'wochit',
      fileName: (format) => `wochit-embedded.${format}.js`,
    },
  },
});
