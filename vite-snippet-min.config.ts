import { resolve } from 'path';
import { defineConfig, PluginOption } from 'vite';
import { copyFileSync } from 'fs';
import { version } from './package.json';

function cloneAsLatest(): PluginOption {
  return {
    name: 'clone-as-latest',
    closeBundle() {
      try {
        for (const f of [
          `${version}.js`,
          `${version}.min.js`,
          `${version}.min.js.map`,
        ]) {
          const latest = f
            .replace(/^(\d+\.\d+\.\d+)/, 'latest')
            .replace(/-\w*\.\d+/, '-rc');
          copyFileSync(`./dist-snippet/${f}`, `./dist-snippet/${latest}`);
        }
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
