const MOBILE = 'mobile';
const DESKTOP = 'desktop';
const TABLET = 'tablet';

const addClasses = (row) => {
  const content = row.children[0];
  const elementClass = row.children[2].innerText;
  if (elementClass) {
    content.classList.add(elementClass);
  }
};

const isRowAvailable = (row) => {
  if (window.innerWidth < 700) {
    return row.children[1].innerText.split(',').includes(MOBILE);
  }
  if (window.innerWidth < 900) {
    return row.children[1].innerText.split(',').includes(TABLET);
  }
  return row.children[1].innerText.split(',').includes(DESKTOP);
};

export default async function decorate(block) {
  const items = [...block.children].filter((row) => isRowAvailable(row));
  items.forEach((row) => {
    addClasses(row);
    row.replaceChildren(row.children[0]);
  });
  items.forEach((col) => col.classList.add('menu-open-item'));
  block.replaceChildren(...items);
}
