// add delayed functionality here
import { iframe } from './dom-helpers.js';

function loadVideoIframe(width, height, videoUrl) {
  return iframe({
    width, height, frameBorder: '0', src: videoUrl, allowFullscreen: true, loaded: 'lazy',
  });
}

export {
  // eslint-disable-next-line import/prefer-default-export
  loadVideoIframe,
};
