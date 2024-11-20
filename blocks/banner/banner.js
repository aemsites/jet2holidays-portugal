import {
  div, domEl,
} from '../../scripts/dom-helpers.js';

export default async function decorate(block) {
  const rows = [...block.children];

  let bannerProperties = {};

  rows.forEach((row) => {
    const fieldName = row.children[0].innerText;
    if (fieldName === 'Image') {
      bannerProperties = { ...bannerProperties, [fieldName]: row.children[1].children[0] };
    } else if (fieldName === 'Links') {
      const links = [...row.children[1].children].map((link) => link.children[0]);
      links.forEach((link) => link.removeAttribute('class'));
      bannerProperties = { ...bannerProperties, [fieldName]: links };
    } else if (fieldName === 'Buttons') {
      const buttons = [...row.children[1].children].map((link) => link.children[0]);
      bannerProperties = { ...bannerProperties, [fieldName]: buttons };
    } else {
      bannerProperties = { ...bannerProperties, [fieldName]: row.children[1] };
    }
  });

  const titleContent = bannerProperties.Title.children;
  const dom = domEl(
    'div',
    div(
      { class: 'head' },
      bannerProperties.Image,
      ...titleContent,
    ),
    div(
      { class: 'content' },
      bannerProperties.Text,
      ...bannerProperties.Links,
      ...bannerProperties.Buttons,
    ),
  );

  block.replaceChildren(dom);
}
