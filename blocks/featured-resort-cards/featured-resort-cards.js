import {
  div, domEl, p, a, img,
} from '../../scripts/dom-helpers.js';

export default async function decorate(block) {
  const dom = domEl('ul');
  dom.className = 'resorts-grid-section';

  const mapPinPath = '../../icons/mapPin.svg';
  const chevronRight = '../../icons/chevronRight.svg';

  [...block.children].forEach((row, index) => {
    // skip the first element, which is used to inform the authors the column structure
    if (index === 0) {
      return;
    }

    const resortPicture = row.children[0].querySelector('picture');
    const resortTitle = row.children[1];
    const resortDescription = row.children[2];
    const viewMapLink = row.children[3].querySelector('p').querySelector('a').href;
    const viewMapTitle = row.children[3].querySelector('p').querySelector('a').title;
    const viewAccommodationsLink = row.children[4].querySelector('p').querySelector('a').href;
    const viewAccommodationsTitle = row.children[4].querySelector('p').querySelector('a').title;

    const il = domEl(
      'li',
      div(
        { class: 'main-resort-card' },
        a(
          { href: '#' },
          resortPicture,
        ),
        div(
          { class: 'resort-card-subsection' },
          div(
            { class: 'resort-details' },
            a({ class: 'resort-title', href: '#' }, resortTitle),
            p(resortDescription),
          ),
        ),
        div(
          { class: 'details-footer' },
          a(
            { class: 'view-map-button', href: viewMapLink },
            viewMapTitle,
            img({ class: 'map-pin-icon', src: mapPinPath, alt: 'Map Pin' }),
          ),
          div(
            { class: 'view-accommodations-button' },
            a(
              { class: 'view-map-button', href: viewAccommodationsLink },
              viewAccommodationsTitle,
              img({ class: 'chevron-right', src: chevronRight, alt: 'Chevron Right' }),
            ),
          ),
        ),
      ),
    );

    dom.append(il);
  });

  block.replaceChildren(dom);
}
