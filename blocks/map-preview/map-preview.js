import {
  domEl, div, a,
} from '../../scripts/dom-helpers.js';

export default async function decorate(block) {
  const dom = domEl('div', { class: 'main-container' });
  const callToActionText = block.children[0].querySelector('p');
  const mapImage = block.children[0].querySelector('img');
  mapImage.classList.add('map-image');

  const mapPreview = a(
    { href: '#', class: 'preview-link' },
    div(
      { class: 'preview-container' },
      div(
        { class: 'image-container' },
        mapImage,
      ),
      div(
        { class: 'call-to-action' },
        div(
          { class: 'button-pin' },
          callToActionText.textContent,
        ),
      ),
    ),
  );

  dom.append(mapPreview);
  block.replaceChildren(dom);
}
