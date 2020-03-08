import { exit } from 'process';
import dotenv from 'dotenv';
import { cwd } from 'process';
import { vars } from './vars.mjs';

dotenv.config();

const setup = vars({
  directory: cwd(),
  sources: process.env.SOURCES_NAME,
  distro: process.env.DISTRO_NAME,
});

(async () => {
  const builders = {
    zlib: (await import('./builders/zlib/index.mjs')).default,
    openssl: (await import('./builders/openssl/index.mjs')).default,
    nginx: (await import('./builders/nginx/index.mjs')).default,
  };

  for await (const [builder, settings] of Object.entries(setup)) {
    console.debug(`\n\nprocessing ${builder}`);

    try {
      const result = await ((builders[builder]))({
        settings,
      });

      console.log(`\n\tOK: ${builder} built`);
    } catch (err) {
      console.error(`\n\tER: failed to build ${builder}: ${err.message}`);

      exit(0);
    }
  }
})();
