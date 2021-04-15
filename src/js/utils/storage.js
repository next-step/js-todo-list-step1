export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getStorage = () => {
  return JSON.parse(localStorage.getItem('items')) || [];
}