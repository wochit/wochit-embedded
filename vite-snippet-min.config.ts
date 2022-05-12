import { resolve } from 'path';
import { defineConfig, PluginOption } from 'vite';
import { copyFileSync } from 'fs';
import { version } from './package.json';

function cloneAsLatest(): PluginOption {
  return {
    name: 'clone-as-latest',
    closeBundle() {
      try {
        copyFileSync(
          `./dist-snippet/${version}.js`,
          './dist-snippet/latest.js'
        );
        copyFileSync(
          `./dist-snippet/${version}.min.js`,
          './dist-snippet/latest.min.js'
        );
        copyFileSync(
          `./dist-snippet/${version}.min.js.map`,
          './dist-snippet/latest.min.js.map'
        );
        console.log('\n✓ iife snippet cloned as latest');
      } catch (err: any) {
        console.error(`\n❗️iife snippet wasn't cloned as latest`, err);
        process.exit(err?.errno);
      }
    },
  };
}
export default defineConfig({
  plugins: [cloneAsLatest()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  build: {
    emptyOutDir: false,
    outDir: 'dist-snippet',
    minify: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'lib/snippet/index.ts'),
      name: '__unused__',
      formats: ['iife'],
      fileName: () => `${version}.min.js`,
    },
  },
});
