import {
  clone_or_pull,
} from '../../common/clone_or_pull.mjs';
import {
  compile,
} from '../../common/compile.mjs';

const build = async ({ settings }) => {
  await clone_or_pull({
    url: settings.GIT,
    destination: settings.SOURCES,
  });

  return true;
};

export default build;
