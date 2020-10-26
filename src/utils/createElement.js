import { getDataAttribute } from './utils.js';

export const createElement = (tag, attr, ...children) => {
  const $el = tag
    ? document.createElement(tag)
    : document.createDocumentFragment();

  if (attr) {
    Object.entries(attr).forEach(([key, value]) => {
      if (value === false) return;
      key.includes('data')
        ? ($el.dataset[getDataAttribute(key)] = value)
        : $el.setAttribute(key, value);
    });
  }

  if (children) {
    children.map((node) => {
      if (typeof node === 'string') {
        node = document.createTextNode(node);
      }
      $el.appendChild(node);
    });
  }

  return $el;
};
