export const $ = (selector) => document.querySelector(selector);

export const $All = (selector) => document.querySelectorAll(selector);

export const valueFromHash = () => {
  const state = location.hash;
  const hashRegExr = /\w+/g;
  const [result] = (state.match(hashRegExr)) ? state.match(hashRegExr) : ['all'];

  return result;
}
