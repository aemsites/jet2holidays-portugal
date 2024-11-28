import {
  domEl, div, h5,
} from '../../scripts/dom-helpers.js';
import { loadVideoIframe } from '../../scripts/delayed.js';

export default function decorate(block) {
  const videoTitle = block.children[0].querySelectorAll('div')[0].querySelector('p').textContent;
  const videoId = block.children[0].querySelectorAll('div')[1].querySelector('p').textContent;
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  const videoIframe = loadVideoIframe('100%', '420', videoUrl);

  const dom = domEl(
    'div',
    div(
      h5({ class: 'video-title' }, videoTitle),
    ),
    div({ class: 'video-container' }, videoIframe),
  );

  dom.className = 'container-with-title';
  block.replaceChildren(dom);
}
