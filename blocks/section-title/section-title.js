import { domEl } from '../../scripts/dom-helpers.js';

export default async function decorate(block) {
  const dom = domEl('div');
  dom.className = 'main-container';

  if (block.children[0].querySelectorAll('div').length === 1) { /* Simple heading without button or link */
    const headingWithoutLink = block.children[0].querySelector('p');
    dom.append(domEl('h5', { class: 'heading-without-link' }, headingWithoutLink.textContent));
  } else if (block.children[0].querySelectorAll('div').length === 2) { /* Heading with link + see all button */
    const authorDivs = block.children[0].querySelectorAll('div');
    const headingWithLink = authorDivs[0].querySelector('p').querySelector('a');
    const seeAllButton = authorDivs[1].querySelectorAll('p')[0].querySelector('a');
    const seeMoreIcon = authorDivs[1].querySelectorAll('p')[1].querySelector('span').querySelector('img');

    seeMoreIcon.className = 'see-more-icon';
    seeAllButton.className = 'see-all-button';
    seeAllButton.append(seeMoreIcon);

    dom.append(domEl('h5', { class: 'heading-with-link' }, headingWithLink));
    dom.append(seeAllButton);
  }

  block.replaceChildren(dom);
}
