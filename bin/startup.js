// @ts-check
import { exec } from 'child_process';
import logger from './Logger.js';
import spinner from './Spinner.js';


function buildGameForWeb() {
  exec('lix lime build html5', (err, _stdout, _stderr) => {
    if (err) {
      logger.error(`buildGameForWeb Error: ${err}`);
      return;
    }
    spinner.stop();
    logger.success(`🎉 Done!`);
  });
}

function main() {
  logger.info(`Doing first build of game`);
  spinner.start();
  buildGameForWeb();
}

main();
