import {
  domEl, h6, h5,
} from '../../scripts/dom-helpers.js';

const changeSectionClass = (oldClass, newClass) => {
  const elements = document.querySelectorAll(`.${oldClass}`);

  elements.forEach((element) => {
    element.classList.remove(`${oldClass}`);
    element.classList.add(`${newClass}`);
  });
};

const handleExpandEvent = (expandedView) => {
  if (expandedView) {
    changeSectionClass('invisible-section', 'visible-section');
    changeSectionClass('expand-icon', 'collapse-icon');
  } else {
    changeSectionClass('visible-section', 'invisible-section');
    changeSectionClass('collapse-icon', 'expand-icon');
  }
};

const handleScreenResize = (expandedView) => {
  const screenWidth = window.innerWidth;

  if (screenWidth < 600 && expandedView === true) {
    handleExpandEvent(false);
    return false;
  }

  if (screenWidth > 600 && expandedView === false) {
    handleExpandEvent(true);
    return true;
  }

  return null;
};

export default async function decorate(block) {
  const dom = domEl('ul');
  dom.className = 'footer-links-grid-section';

  let expandedView = window.innerWidth >= 600;

  // resize screen
  window.addEventListener('resize', () => {
    const validChange = handleScreenResize(expandedView);
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
        handleExpandEvent(expandedView);
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

    li.className = expandedView ? 'visible-section' : 'invisible-section';
    dom.append(li);
  });

  block.replaceChildren(dom);
}
