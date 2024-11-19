export default async function decorate(block) {
  const unorderedList = block.children[0].querySelector('ul');
  unorderedList.className = 'links-list';

  const listItems = unorderedList.querySelectorAll('li');
  listItems.forEach((li) => {
    li.className = 'list-item';
  });

  block.replaceChildren(unorderedList);
}
