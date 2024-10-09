import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    const anchor = document.createElement('a');
    anchor.href = '#';
    const figure = document.createElement('figure');
    figure.className = 'cards-card-figure';
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'figure-image';
        figure.append(div);
      } else if (div.children.length === 1 && div.querySelector('p')) {
        div.className = 'figure-image-overlay';
        figure.append(div);
      } else div.className = 'cards-card-body';
    });
    anchor.append(figure);
    li.append(anchor);
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
