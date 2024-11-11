import {
  domEl, h6, h5,
} from '../../scripts/dom-helpers.js';

const handleScreenResize = (expandedView, parentEl) => {
  const screenWidth = window.innerWidth;

  if (screenWidth < 600 && expandedView === true) {
    parentEl.classList.remove('open');
    return false;
  }

  if (screenWidth > 600 && expandedView === false) {
    parentEl.classList.add('open');
    return true;
  }

  return null;
};

export default async function decorate(block) {
  const parentEl = document.querySelector('.footer-links');

  const dom = domEl('ul');
  dom.className = 'footer-links-grid-section';

  let expandedView = window.innerWidth >= 600;
  if (expandedView) {
    parentEl.classList.add('open');
  }

  // resize screen
  window.addEventListener('resize', () => {
    const validChange = handleScreenResize(expandedView, parentEl);
    if (validChange !== null) {
      expandedView = validChange;
    }
  });

  [...block.children].forEach((row, index) => {
    /* mobile collapsible view */
    if (index === 0) {
      const headingText = row.children[0].querySelectorAll('p')[0].textContent;
      const expandIcon = row.children[0].querySelectorAll('p')[1].querySelector('span');
      expandIcon.className = 'expand-icon';

      const mobileHeading = domEl(
        'div',
        h5({ class: 'collapsible-heading' }, headingText),
        expandIcon,
      );

      mobileHeading.className = 'mobile-heading';
      dom.append(mobileHeading);

      /* click event listener logic */
      mobileHeading.addEventListener('click', () => {
        parentEl.classList.toggle('open');
        expandedView = !expandedView;
      });

      return;
    }

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
}
