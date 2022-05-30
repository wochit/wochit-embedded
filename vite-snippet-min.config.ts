import { resolve } from 'path';
import { defineConfig, PluginOption } from 'vite';
import { copyFileSync, readdirSync } from 'fs';
import { version } from './package.json';

const outDir = 'dist-snippet';

function cloneAsLatest(): PluginOption {
  return {
    name: 'clone-as-latest',
    closeBundle() {
      try {
        readdirSync(outDir).forEach((fileName) => {
          const latest = fileName
            .replace(/^(\d+\.\d+\.\d+)/, 'latest')
            .replace(/-\w*\.\d+/, '-rc');
          copyFileSync(`${outDir}/${fileName}`, `${outDir}/${latest}`);
        });
        console.log('\n✓ iife snippet cloned as latest');
      } catch (err: any) {
        console.error(`\n❗️iife snippet wasn't cloned as latest`, err);
        process.exit(err?.errno || -1);
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
    outDir,
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
