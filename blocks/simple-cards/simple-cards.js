import {
  div, domEl, a, span,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const dom = domEl('div', { class: 'simple-cards-container' });
  const cardsList = domEl('ul', { class: 'cards-grid-section' });

  [...block.children].forEach((row) => {
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
