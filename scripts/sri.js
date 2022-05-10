import { exec } from 'child_process';
import { createRequire } from 'module';
const { version } = createRequire(import.meta.url)('../package.json');

const FILES = [`${version}.js`, `${version}.min.js`];
const ALGO = 'sha384';

for (const f of FILES) {
  const cmd = `openssl dgst -${ALGO} -binary ./dist-snippet/${f} | openssl base64 -A`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      process.exit(-1);
    } else {
      const HASH = String(stdout).trim();
      console.log(`🧾 ${f}:\tintegrity="${ALGO}-${HASH}"`);
    }
  });
}
