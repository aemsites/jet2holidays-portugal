import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    const anchor = document.createElement('a');
    anchor.className = 'simple-cards-card-anchor';
    anchor.href = '#';
    const figure = document.createElement('figure');
    figure.className = 'simple-cards-card-figure';
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        const image = div.querySelector('picture');
        image.className = 'figure-image';
        figure.append(image);
      } else if (div.children.length === 1 && div.querySelector('p')) {
        const figCaption = document.createElement('figcaption');
        figCaption.textContent = div.querySelector('p').querySelector('strong').querySelector('a').title;
        figCaption.className = 'figure-image-overlay';
        anchor.href = div.querySelector('p').querySelector('strong').querySelector('a').href;
        figure.append(figCaption);
      }
      div.remove();
    });
    anchor.append(figure);
    li.append(anchor);
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}