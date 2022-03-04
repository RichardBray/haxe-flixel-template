#!/usr/bin/env node

// @ts-check
import { exec, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import logger from './Logger.js';
import spinner from './Spinner.js';

const execPromise = promisify(exec);
const PORT = 1212;

async function main() {
  await buildGameForWeb();
  startConcurrently();
}

async function buildGameForWeb() {
  logger.info('🔨 Doing first build of game');

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
  logger.info('⏱  Starting server and watcher');

  const watchCmd = "watchman-make -p 'src/**/*.hx' -r 'sh watcher.sh'";
  const serverCmd = `http-server export/html5/bin --port ${PORT} -c0`;
  const compServerCmd = 'haxe -v --wait 8000';

  const args = ['concurrently', '--hide', '1,2', watchCmd, serverCmd, compServerCmd];
  const child = spawn('npx', args);

  child.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  child.stderr.on('data', (data) => {
    logger.info(`child stderr:\n${data}`);
  });

  child.on('error', (err) => {
    logger.error(`startConcurrently failed to run: ${err}`);
  });

  logger.info(`Game running on http://localhost:${PORT}`);
}

main();
