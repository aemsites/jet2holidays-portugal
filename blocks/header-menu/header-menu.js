import {
  domEl,
} from '../../scripts/dom-helpers.js';

function computeMenuEntry(rows, name) {
  const row = rows.filter((r) => r.children[0].innerText === name)[0];
  if (!row) {
    return null;
  }
  const cols = row.children;
  let content;
  if (cols[2].innerText) {
    const itemContent = document.getElementsByClassName(cols[2].innerText)[0];
    const itemIcon = [...cols[1].children][0];
    const cancelButton = itemContent.getElementsByClassName('icon-cancel')[0];
    if (cancelButton) {
      cancelButton.addEventListener('click', () => {
        itemContent.classList.toggle('open');
      });
    }
    itemIcon.addEventListener('click', (event) => {
      event.stopPropagation();
      itemContent.classList.toggle('open');
    });
    document.addEventListener('click', (event) => {
      if (!itemIcon.contains(event.target)) {
        if (itemContent.classList.contains('open')) {
          itemContent.classList.remove('open');
        }
      }
    });
    content = [itemIcon, itemContent];
  } else {
    content = [...cols[1].children];
  }
  return domEl(
    'div',
    { class: 'flex-item' },
    ...content,
  );
}
export default async function decorate(block) {
  const menuEntry = computeMenuEntry([...block.children], 'Menu');
  const logoEntry = computeMenuEntry([...block.children], 'Logo');
  const signInEntry = computeMenuEntry([...block.children], 'SignIn');
  const mobile = [signInEntry, logoEntry, menuEntry];
  const desktop = [logoEntry, menuEntry, signInEntry];
  block.replaceChildren(...(window.innerWidth < 600 ? mobile : desktop));
}
