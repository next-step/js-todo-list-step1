export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getStorage = () => {
  return JSON.parse(localStorage.getItem('items')) || [];
}

export function storageItem(item) {
  const { id, text, done } = item;

  this.id = id;
  this.text = text;
  this.done = done;
}