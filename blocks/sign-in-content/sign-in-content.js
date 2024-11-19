export default async function decorate(block) {
  [...block.children].forEach((col) => col.classList.add('sign-in-item'));
}
