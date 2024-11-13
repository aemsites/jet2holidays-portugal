function removeButtonFromIcon(iconElement) {
  if (iconElement.parentElement.tagName !== 'A') {
    return;
  }
  iconElement.parentElement.parentElement.replaceWith(iconElement.parentElement);
  iconElement.parentElement.removeAttribute('class');
}
export default async function decorate(block) {
  [...block.children].forEach((col) => col.classList.add('flex-item'));
  const icons = document.querySelectorAll('.icon');
  icons.forEach((icon) => removeButtonFromIcon(icon));
}
