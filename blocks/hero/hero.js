import {
  div, domEl, h1, p,
} from '../../scripts/dom-helpers.js';

export default async function decorate(block) {
  const rows = [...block.children];

  const heroProperties = {};

  rows.forEach((row) => {
    const fieldName = row.children[0].innerText;
    heroProperties[fieldName] = { ...heroProperties, [fieldName]: row.children[1] };
  });

  const dom = domEl(
    'div',
    div({ class: 'picture' }, heroProperties.Image),
    div(
      { class: 'grid-container' },
      div(
        { class: 'title column' },
        h1(
          heroProperties.Title,
        ),
      ),
      div(
        { class: 'column' },
        div(
          { class: 'discount-circle discount-circle-size' },
          p({ class: 'dicsount-text' }, heroProperties.Promo),
        ),
      ),
    ),
  );

  block.replaceChildren(dom);
}
