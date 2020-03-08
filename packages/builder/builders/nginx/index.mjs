import {
  clone_or_pull,
} from '../../common/clone_or_pull.mjs';
import {
  compile,
} from '../../common/compile.mjs';

const build = async ({
  settings
}) => {
  const {
    should_rebuild
  } = await clone_or_pull({
    url: settings.GIT,
    destination: settings.SOURCES,
  });

  if (should_rebuild === true) {
    try {
      return compile({
        commands: settings.COMMANDS,
        dir: settings.SOURCES,
      });
    } catch (err) {
      return Promise.reject(new Error(err.message));
    }
  }
};

export default build;
