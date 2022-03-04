// @ts-check
import { exec } from 'child_process';
import logger from './Logger.js';
import spinner from './Spinner.js';
import { promisify } from 'util';

const execPromise = promisify(exec);

async function main() {
  await buildGameForWeb();
  await startConcurrently();
}

async function buildGameForWeb() {
  logger.info(`🔨 Doing first build of game`);

  spinner.start();

  try {
    await execPromise('lix lime build html5');

    spinner.stop();
    logger.success(`🎉 Done!`);

  } catch (err) {
    logger.error(`buildGameForWeb Error: ${err}`);
  }
}

async function startConcurrently() {
  logger.info(`👁 Starting server and watcher`);

  try {
    const watchCmd = 'watchman-make -p "src/**/*.hx" -r "sh watcher.sh"';
    const serverCmd = 'http-server export/html5/bin --port 1212 -c0';
    const compServerCmd = 'haxe -v --wait 8000';

    const { stdout, stderr } = await execPromise(
      `concurrently --hide "1,2" "${watchCmd}" "${serverCmd}" "${compServerCmd}"`
    );

    logger.info(stdout);
    logger.info(stderr);

  } catch (err) {
    logger.error(`startConcurrently Error: ${err}`);
  }
}

main();
