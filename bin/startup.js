#!/usr/bin/env node
// @ts-check
import { exec, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import logger from './services/Logger.js';
import spinner from './services/Spinner.js';

const execPromise = promisify(exec);
const WEB_SERVER_PORT = 1212;
const COMPILATION_SERVER_PORT = 8000;

async function main() {
  const skipFirstBuildFlag = process.argv[2] === '--skip' || process.argv[2] === '-s';

  if (!skipFirstBuildFlag) await buildGameForWeb();
  startConcurrently();
}

async function buildGameForWeb() {
  logger.log('🔨 Doing first build of game');

  spinner.start();

  try {
    const { stderr } = await execPromise('lix lime build html5');

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
  logger.log('[ϟ] Starting watcher, web and compilation server');

  const watchCmd = "watchman-make -p 'src/**/*.hx' -r 'node bin/watcher.js'";
  const serverCmd = `http-server export/html5/bin --port ${WEB_SERVER_PORT} -c0`;
  const compServerCmd = `haxe -v --wait ${COMPILATION_SERVER_PORT}`;

  const args = ['concurrently', '--hide', '1,2', '--names', 'ϟ', watchCmd, serverCmd, compServerCmd];
  const child = spawn('npx', args);

  child.stdout.on('data', (data) => {
    process.stdout.write(String(data));
  });

  child.stderr.on('data', (data) => {
    logger.warn(`child stderr: ${data}`);
  });

  child.on('error', (err) => {
    logger.error(`startConcurrently failed to run: ${err}`);
  });

  logger.info(`\nGame running on http://localhost:${WEB_SERVER_PORT}\nTo shut down press <CTRL> + C at any time.\n`);
}

main();
