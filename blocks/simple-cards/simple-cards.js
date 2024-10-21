import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const figure = document.createElement('figure');

    anchor.className = 'simple-cards-card-anchor';
    anchor.href = '#';
    figure.className = 'simple-cards-card-figure';

    while (row.firstElementChild) li.append(row.firstElementChild);

    [...li.children].forEach((div) => {
      /* simple cards image */
      if (div.children.length === 1 && div.querySelector('picture')) {
        const image = div.querySelector('picture');
        image.className = 'figure-image';
        figure.append(image);
        div.remove();
        return;
      }

      /* simple cards overlay with no icons */
      if (div.children.length === 1 && div.querySelector('p')) {
        const figCaption = document.createElement('figcaption');
        anchor.href = div.querySelector('p').querySelector('strong').querySelector('a').href;
        figCaption.textContent = div.querySelector('p').querySelector('strong').querySelector('a').title;
        figCaption.className = 'figure-image-overlay';
        ul.className = 'simple-cards-grid-regions';
        figure.append(figCaption);
        div.remove();
        return;
      }

      /* simple cards overlay cards with icons */
      if (div.querySelectorAll('p').length === 2) {
        const figCaptionWithIcon = document.createElement('figcaption');
        const figCaptionSpan = document.createElement('span');
        const activityDiv = document.createElement('div');
        const iconImage = div.querySelectorAll('p')[1].querySelector('strong').querySelector('span').querySelector('img');
        anchor.href = div.querySelectorAll('p')[0].querySelector('strong').querySelector('a').href;
        iconImage.className = 'figure-span-overlay-icon';
        ul.className = 'simple-cards-grid-activities';
        activityDiv.textContent = div.querySelectorAll('p')[0].querySelector('strong').querySelector('a').title;
        activityDiv.className = 'figure-span-overlay-text';
        figCaptionSpan.className = 'figure-span-overlay';
        figCaptionSpan.append(iconImage);
        figCaptionSpan.append(activityDiv);
        figCaptionWithIcon.append(figCaptionSpan);
        figCaptionWithIcon.className = 'figure-image-overlay'; figure.append(figCaptionWithIcon);
        div.remove();
      }
    });
    anchor.append(figure);
    li.append(anchor);
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
