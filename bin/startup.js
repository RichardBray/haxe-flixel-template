#!/usr/bin/env node
const {exec} = require('child_process');
const logger = require('./Logger.js');

function buildGameForWeb() {
  exec('lix lime build html5', (err, stdout, stderr) => {
    if (err) {
      logger.error(`buildGameForWeb Error: ${err}`);
      return;
    }
    logger.success(`something ${stdout}`);
  });
}

function main() {
  logger.info('Doing first build of game...');
  buildGameForWeb();
}

main();
