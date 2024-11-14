import {
  domEl, h6, h5, span,
} from '../../scripts/dom-helpers.js';
import { decorateIcons, fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const ph = await fetchPlaceholders();
  const parentEl = document.querySelector('.footer-links');

  const dom = domEl('ul');
  dom.className = 'footer-links-grid-section';

  const mobileHeading = domEl(
    'div',
    h5({ class: 'collapsible-heading' }, ph.expandFooterLinksText),
    span({ class: 'icon icon-chevron-down' }),
  );

  mobileHeading.className = 'mobile-heading';
  dom.append(mobileHeading);

  /* click event listener logic */
  mobileHeading.addEventListener('click', () => {
    parentEl.classList.toggle('open');
  });

  [...block.children].forEach((row, index) => {
    /* mobile collapsible view */
    if (index === 0) return;

    const sectionHeading = row.children[0].querySelector('p');
    const sectionLinks = row.children[1].querySelector('ul');
    sectionLinks.className = 'section-links';

    const li = domEl(
      'li',
      h6({ class: 'section-heading' }, sectionHeading.textContent),
      sectionLinks,
    );

    li.className = 'footer-section';
    dom.append(li);
  });

  block.replaceChildren(dom);
  decorateIcons(block);
}
