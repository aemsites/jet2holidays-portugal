import {
  domEl,
} from '../../scripts/dom-helpers.js';

export default async function decorate(block) {
  const dom = domEl('div', { class: 'main-container' });

  /* Page descriptions can be simple or with a list of links */
  [...block.children].forEach((row) => {
    const heading = row.querySelector('h1');
    const description = row.querySelector('p');
    const listTitle = row.querySelector('h2');
    const listOfLinks = row.querySelector('ul');

    if (heading !== null) {
      dom.append(heading);
    }

    if (description !== null) {
      dom.append(description);
    }

    if (listTitle !== null) {
      dom.append(listTitle);
    }

    if (listOfLinks !== null) {
      listOfLinks.className = 'links-list';
      const listItems = listOfLinks.querySelectorAll('li');

      listItems.forEach((li) => {
        li.className = 'list-item';
      });

      dom.append(listOfLinks);
    }
  });

  block.replaceChildren(dom);
}
