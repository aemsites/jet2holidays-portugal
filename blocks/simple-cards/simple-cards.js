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
      if (div.children.length === 1 && div.querySelector('picture')) { // simple cards image
        const image = div.querySelector('picture');
        // image.width = '600';
        // image.height = '400';
        image.className = 'figure-image';
        figure.append(image);
      } else if (div.children.length === 1 && div.querySelector('p')) { // simple cards overlay with no icons
        ul.className = 'simple-cards-grid-regions';
        const figCaption = document.createElement('figcaption');
        figCaption.textContent = div.querySelector('p').querySelector('strong').querySelector('a').title;
        figCaption.className = 'figure-image-overlay';
        anchor.href = div.querySelector('p').querySelector('strong').querySelector('a').href;
        figure.append(figCaption);
      } else if (div.querySelectorAll('p').length === 2) { // simple cards overlay cards with icons
        ul.className = 'simple-cards-grid-activities';
        const figCaptionWithIcon = document.createElement('figcaption');
        const figCaptionSpan = document.createElement('span');
        const activityDiv = document.createElement('div');
        const iconImage = div.querySelectorAll('p')[1].querySelector('strong').querySelector('span').querySelector('img');
        iconImage.className = 'figure-span-overlay-icon';
        activityDiv.textContent = div.querySelectorAll('p')[0].querySelector('strong').querySelector('a').title;
        activityDiv.className = 'figure-span-overlay-text';
        figCaptionSpan.className = 'figure-span-overlay';
        figCaptionSpan.append(iconImage);
        figCaptionSpan.append(activityDiv);
        figCaptionWithIcon.append(figCaptionSpan);
        figCaptionWithIcon.className = 'figure-image-overlay';
        anchor.href = div.querySelectorAll('p')[0].querySelector('strong').querySelector('a').href;
        figure.append(figCaptionWithIcon);
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
