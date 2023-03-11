#!/usr/bin/env node
// @ts-check
import { exec, spawn } from 'node:child_process';
import { promisify } from 'node:util';

import logger from './services/Logger.js';
import spinner from './services/Spinner.js';
import options from './options.js';

const execPromise = promisify(exec);

async function main() {
  const skipFirstBuildFlag = process.argv[2] === '--skip' || process.argv[2] === '-s';
  const allowFirstBuild = skipFirstBuildFlag ? !skipFirstBuildFlag : options.allowFirstBuild;

  renderTitle();

  if (options.useCompServerInOwnTab) logger.warn(`⚠️ Please make sure you have the comp server running on port ${options.compilationServerPort}\n`)
  if (allowFirstBuild && options.useCompServerInOwnTab) await buildGameForWeb();

  startConcurrently();
}

function renderTitle() {
  logger.log(
    "  _    _                  ______ _ _          _   _______                   _       _       \r\n | |  | |                |  ____| (_)        | | |__   __|                 | |     | |      \r\n | |__| | __ ___  _____  | |__  | |___  _____| |    | | ___ _ __ ___  _ __ | | __ _| |_ ___ \r\n |  __  |/ _` \\ \\/ / _ \\ |  __| | | \\ \\/ / _ \\ |    | |/ _ \\ '_ ` _ \\| '_ \\| |/ _` | __/ _ \\\r\n | |  | | (_| |>  <  __/ | |    | | |>  <  __/ |    | |  __/ | | | | | |_) | | (_| | ||  __/\r\n |_|  |_|\\__,_/_/\\_\\___| |_|    |_|_/_/\\_\\___|_|    |_|\\___|_| |_| |_| .__/|_|\\__,_|\\__\\___|\r\n                                                                     | |                    \r\n                                                                     |_|                    "
  );
  logger.log('v.0.3.1\n');
}

async function buildGameForWeb() {
  logger.log('🔨 Doing first build of game');
  spinner.start();

  try {
    const cmd = options.useCompServerInOwnTab
      ? `lix lime build html5 -debug --connect ${options.compilationServerPort}`
      : 'lix lime build html5 -debug';

    const { stderr } = await execPromise(cmd);

    spinner.stop();
    logger.success(`✅ Done!`);

    if (stderr) {
      logger.error(stderr);
      process.exit(1);
    }
  } catch (err) {
    logger.error(`buildGameForWeb failed to run: ${err}`);
  }
}

function startConcurrently() {
  const logMsg = options.useCompServerInOwnTab
    ? '[ϟ] Starting file watcher and web server'
    : '[ϟ] Starting file watcher, web and compilation server';

  logger.log(logMsg);

  const watchCmd = "watchman-make -p 'src/**/*.hx' -r 'node bin/watcher.js'";
  const serverCmd = `http-server export/html5/bin --port ${options.webServerPort} -c0`;
  const compServerCmd = `haxe -v --wait ${options.compilationServerPort}`;

  const args = ['concurrently', '--hide', '1,2', '--names', 'ϟ', watchCmd, serverCmd, compServerCmd];

  if (options.compServerNewTab) args.pop();

  const child = spawn('npx', args, { stdio: ['pipe', 'inherit', 'pipe'] });
  // pipe stdin, inherit stdout, pipe stderr

  child.stderr.on('data', (data) => {
    logger.warn(`child stderr: ${data}`);
  });

  child.on('error', (err) => {
    logger.error(`startConcurrently failed to run: ${err}`);
  });

  logger.info(
    `\nYour game is running on http://localhost:${options.webServerPort}\nTo shut it down press <CTRL> + C at any time.\n`
  );
}

main();
