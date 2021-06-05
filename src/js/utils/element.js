export const $ = (className) => document.querySelector(`.${className}`);

export const addClass = (target, className) => target.classList.add(className);

export const removeClass = (target, className) => target.classList.remove(className);

export const closest = (target, className) => target.closest(`.${className}`);