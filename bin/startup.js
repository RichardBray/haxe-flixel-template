#!/usr/bin/env node
// @ts-check
import { exec, spawn } from 'node:child_process';
import { promisify } from 'node:util';

import logger from './services/Logger.js';
import spinner from './services/Spinner.js';
import options from './options.js';

const execPromise = promisify(exec);
const compServerCmd = `haxe -v --wait ${options.compilationServerPort}`;

async function main() {
  const skipFirstBuildFlag = process.argv[2] === '--skip' || process.argv[2] === '-s';
  const allowFirstBuild = skipFirstBuildFlag ? !skipFirstBuildFlag : options.allowFirstBuild;

  renderTitle();

  if (options.compServerNewTab) await startCompServerInNewTab();
  if (allowFirstBuild) await buildGameForWeb();

  startConcurrently();
}

function renderTitle() {
  logger.log(
    "  _    _                  ______ _ _          _   _______                   _       _       \r\n | |  | |                |  ____| (_)        | | |__   __|                 | |     | |      \r\n | |__| | __ ___  _____  | |__  | |___  _____| |    | | ___ _ __ ___  _ __ | | __ _| |_ ___ \r\n |  __  |/ _` \\ \\/ / _ \\ |  __| | | \\ \\/ / _ \\ |    | |/ _ \\ '_ ` _ \\| '_ \\| |/ _` | __/ _ \\\r\n | |  | | (_| |>  <  __/ | |    | | |>  <  __/ |    | |  __/ | | | | | |_) | | (_| | ||  __/\r\n |_|  |_|\\__,_/_/\\_\\___| |_|    |_|_/_/\\_\\___|_|    |_|\\___|_| |_| |_| .__/|_|\\__,_|\\__\\___|\r\n                                                                     | |                    \r\n                                                                     |_|                    "
  );
  logger.log('v.0.2.1\n');
}

async function startCompServerInNewTab() {
  logger.log('⚙️  Starting compilation server in new tab');
  try {
    const { stdout, stderr } = await execPromise(`npx ttab -t compServer -G ${compServerCmd}`);
    await new Promise(resolve => setTimeout(resolve, options.newTabTimeout));
    if (stdout) {
      logger.log(stdout);
    }

    if (stderr) {
      logger.error(stderr);
      process.exit(1);
    }
  } catch (err) {
    logger.error(`startCompServerInNewTab failed to run: ${err}`);
  }
}

async function buildGameForWeb() {
  logger.log('🔨 Doing first build of game');
  spinner.start();

  try {
    const cmd = options.compServerNewTab
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
  const logMsg = options.compServerNewTab
    ? '[ϟ] Starting file watcher and web server'
    : '[ϟ] Starting file watcher, web and compilation server';

  logger.log(logMsg);

  const watchCmd = "watchman-make -p 'src/**/*.hx' -r 'node bin/watcher.js'";
  const serverCmd = `http-server export/html5/bin --port ${options.webServerPort} -c0`;
  const compServerCmd = `haxe -v --wait ${options.compilationServerPort}`;

  const args = ['concurrently', '--hide', '1,2', '--names', 'ϟ', watchCmd, serverCmd, compServerCmd];

  if (options.compServerNewTab) args.pop();

  const child = spawn('npx', args, { stdio: ['pipe', 'inherit', 'pipe'] });
  // pupe stdin, inherit stdout, pipe stderr

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
