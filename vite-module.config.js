import path from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'lib/module.ts'),
      name: 'wochit',
      fileName: (format) => `module.${format}.js`,
    },
    rollupOptions: {
      output: [{ exports: 'named' }],
    },
  },
});
