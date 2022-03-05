// @ts-check
import logUpdate from 'log-update';

/**
 * @ref https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json#L580
 */
class Spinner {
  static interval;

  static start() {
    let frame = 0;
    const frames = ['.  ', '.. ', '...', ' ..', '  .', '   '];

    Spinner.interval = setInterval(() => {
      frame = frame + 1 === frames.length ? 0 : frame + 1;

      logUpdate(frames[frame]);
    }, 200);
  }

  static stop() {
    logUpdate.clear();
    clearInterval(Spinner.interval);
  }
}

export default Spinner;
