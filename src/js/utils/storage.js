const storage = window.localStorage;

export const getStorage = () => {
  return JSON.parse(storage.getItem('items')) || [];
}

export const setStorage = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
}
