const ROW_INDEXES = {
  IMAGE_BACKGROUND: 0,
  TITLE: 1,
  DISCOUNT_CIRCLE: 2,
};

const COL_INDEXES = {
  DISCOUNT_BIG_TEXT: 1,
  DISCOUNT_SMALL_TEXT: 2,
  DISCOUNT_ALL_TEXT: 0,
};

function buildDiscountCircle(discountCircleDiv) {
  discountCircleDiv.classList.add('discount-circle');
  discountCircleDiv.classList.add('discount-circle-size');
  const cols = discountCircleDiv.children;

  if (!cols || cols.length === 1) return;

  const pElements = cols[COL_INDEXES.DISCOUNT_ALL_TEXT].querySelectorAll('p');

  pElements.forEach((pElement) => {
    let fullSentence = pElement.textContent;

    const bigText = cols[COL_INDEXES.DISCOUNT_BIG_TEXT].querySelector('p').textContent;
    const smallText = cols[COL_INDEXES.DISCOUNT_SMALL_TEXT].querySelector('p').textContent;

    fullSentence = fullSentence.replace(bigText, `<span class="discount">${bigText}</span>`);
    fullSentence = fullSentence.replace(smallText, `<span class="tandc">${smallText}</span>`);

    pElement.innerHTML = fullSentence;
  });

  discountCircleDiv.replaceChildren(...pElements);
}

function wrapContentInColumn(content) {
  const column = document.createElement('div');
  column.classList.add('column');
  column.appendChild(content);
  return column;
}

export default async function decorate(block) {
  const rows = [...block.children];

  rows[ROW_INDEXES.TITLE].classList.add('hero-text');

  buildDiscountCircle(rows[ROW_INDEXES.DISCOUNT_CIRCLE]);

  const container = document.createElement('div');
  container.classList.add('grid-container');
  container.replaceChildren(
    wrapContentInColumn(rows[ROW_INDEXES.TITLE]),
    wrapContentInColumn(rows[ROW_INDEXES.DISCOUNT_CIRCLE]),
  );
  block.replaceChildren(rows[ROW_INDEXES.IMAGE_BACKGROUND], container);
}
