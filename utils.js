export const hasClass = (dom, className) => {
  return dom.classList.contains(className);
};

export const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
