export const $ = (node) => document.querySelector(node);
export const $all = (node) => document.querySelectorAll(node)
export const isInClassList = (tagName, eventTarget) => eventTarget.classList.contains(tagName)