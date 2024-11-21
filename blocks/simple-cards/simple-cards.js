import {
  div, domEl, a, span,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const dom = domEl('div', { class: 'simple-cards-container' });
  const containsButton = block.children[0].querySelectorAll('div').length === 1;

  if (containsButton) {
    const seeAllButton = domEl('div', { class: 'see-all-button' });
    const buttonContents = block.children[0].querySelector('div').querySelector('p');
    [...buttonContents.children].forEach((child) => {
      seeAllButton.append(child);
    });
    dom.append(seeAllButton);
  }

  const cardsList = domEl('ul', { class: 'cards-grid-section' });

  [...block.children].forEach((row, index) => {
    /* Skip first row if the seeAllButton is present */
    if (index === 0 && containsButton) {
      return;
    }

    const cardPicture = row.children[0].querySelector('picture');
    const cardCaption = row.children[1].querySelectorAll('p')[1]?.querySelector('strong a') || row.children[1].querySelector('p strong a');
    const cardIcon = block.classList.contains('icon')
      ? row.children[1].querySelectorAll('p')[0].querySelector('strong img')
      : null;

    const li = domEl(
      'li',
      div(
        { class: 'card-figure' },
        a(
          { class: 'card-image', href: cardCaption.href },
          cardPicture,
          div(
            { class: 'card-figure-overlay' },
            cardIcon ? span({ class: 'card-icon' }, cardIcon) : '',
            span({ class: 'card-caption' }, cardCaption.title),
          ),
        ),
      ),
    );

    cardsList.append(li);
  });

  dom.append(cardsList);
  block.replaceChildren(dom);
}
