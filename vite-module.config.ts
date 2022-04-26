import { resolve } from 'path';
import { defineConfig } from 'vite';
import { version } from './package.json';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  build: {
    emptyOutDir: false,
    minify: true,
    lib: {
      entry: resolve(__dirname, 'lib/module.ts'),
      name: 'wochit',
      fileName: (format) => `module.${format}.js`,
    },
    rollupOptions: {
      // output: [{ exports: 'named' }],
    },
  },
});
