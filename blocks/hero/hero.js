import {
  div, domEl, p,
} from '../../scripts/dom-helpers.js';

export default async function decorate(block) {
  const rows = [...block.children];

  let heroProperties = {};

  rows.forEach((row) => {
    const fieldName = row.children[0].innerText;
    heroProperties = { ...heroProperties, [fieldName]: row.children[1] };
  });

  const dom = domEl(
    'div',
    div({ class: 'picture' }, heroProperties.Image),
    div(
      { class: 'grid-container' },
      div(
        { class: 'title column' },
        p(
          { class: 'title' },
          heroProperties.Title.innerText,
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
