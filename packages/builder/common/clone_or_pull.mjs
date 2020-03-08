import { promisify } from 'util';
import { resolve } from 'path';
import fs from 'fs';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node/index.js';
import execa from 'execa';

const stat = promisify(fs.stat);

const destination_exist = async ({ destination }) => {
  try {
    return (await stat(destination, {
      bigint: true,
    })).isDirectory();
  } catch {
    return false;
  }
};

const destination_git_dir = async ({ destination }) => {
  try {
    return (await stat(resolve(destination, '.git'), {
      bigint: true,
    })).isDirectory()
  } catch {
    return false;
  }
};

const has_changes = async ({ destination }) => {
  try {
    const result = await execa('git', ['status', '-uno', destination], {
      all: true
    });

    return !result.all.includes('Your branch is up to date');
  } catch {
    return false;
  }
};

export const clone_or_pull = async ({ url, destination }) => {
  let should_rebuild = true;
  let is_git_dir = (await Promise.all([
    destination_exist({ destination }),
    destination_git_dir({ destination }),
  ])).reduce((result, value) => result && value, true);

  if (is_git_dir === true) {
    if ((await has_changes({ destination })) === true) {
      console.debug(`\tgit pull ${url}`);

      await git.pull({
        fs,
        http,
        dir: destination,
        url,
        ref: 'master',
        singleBranch: true,
        author: {
          name: 'argus rtmp server builder',
        },
        fastForwardOnly: true,
      });

      should_rebuild = true;
    } else {
      should_rebuild = false;
    }
  } else {
    console.debug(`\tgit clone ${url}`);

    await git.clone({
      fs,
      http,
      dir: destination,
      url,
      singleBranch: true,
      depth: 1,
    });
  }

  return {
    should_rebuild,
  }
};
