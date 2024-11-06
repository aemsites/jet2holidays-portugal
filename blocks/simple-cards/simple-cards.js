import {
  div, domEl, a, span,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const dom = domEl('ul');

  [...block.children].forEach((row) => {
    const cardPicture = row.children[0].querySelector('picture');

    if (row.children[1].querySelectorAll('p').length === 1) { /* simple cards overlay with no icons */
      dom.className = 'simple-cards-grid-regions';
      const cardCaption = row.children[1].querySelector('p').querySelector('strong').querySelector('a');

      const li = domEl(
        'li',
        div(
          { class: 'card-figure' },
          a(
            { class: 'card-image', href: cardCaption.href },
            cardPicture,
            div(
              { class: 'card-figure-overlay' },
              span({ class: 'card-caption' }, cardCaption.title),
            ),
          ),
        ),
      );

      dom.append(li);
    } else if (row.children[1].querySelectorAll('p').length === 2) { /* simple cards overlay cards with icons */
      dom.className = 'simple-cards-grid-activities';
      const cardCaption = row.children[1].querySelectorAll('p')[1].querySelector('strong').querySelector('a');
      const cardIcon = row.children[1].querySelectorAll('p')[0].querySelector('strong').querySelector('img');

      const li = domEl(
        'li',
        div(
          { class: 'card-figure' },
          a(
            { class: 'card-image-activities', href: cardCaption.href },
            cardPicture,
            div(
              { class: 'card-figure-overlay' },
              span({ class: 'card-icon' }, cardIcon),
              span({ class: 'card-caption-with-icon' }, cardCaption.title),
            ),
          ),
        ),
      );

      dom.append(li);
    }
  });

  block.replaceChildren(dom);
}
