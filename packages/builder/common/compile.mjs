import execa from 'execa';

export const compile = async ({
  commands,
  dir,
}) => {
  process.chdir(dir);

  for await (const [command, ...args] of commands) {
    let command_args = (Array.isArray(args) && (args.length > 0)) ? args.flat() : null;

    console.debug(`\t${command}`, command_args ? command_args.flat().join(' ') : null);

    await execa(command, command_args);
  }

  return true;
};
