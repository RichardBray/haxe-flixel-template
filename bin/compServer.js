import { spawn } from 'node:child_process';

import logger from './services/Logger.js';
import options from './options.js';

function startCompServer() {
  const command = spawn('haxe', ['-v', '--wait', options.compilationServerPort], { stdio: ['pipe', 'inherit', 'pipe'] });
  // pipe stdin, inherit stdout, pipe stderr

  command.stderr.on('data', (data) => {
    logger.warn(`command stderr: ${data}`);
  });

  command.on('error', (err) => {
    logger.error(`startConcurrently failed to run: ${err}`);
  });

  logger.info(
    `\nYCompilation server is now running on port ${options.compilationServerPort}\n`
  );
}

startCompServer();