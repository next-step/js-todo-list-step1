export function setStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key) {
  return JSON.parse(window.localStorage.getItem(key));
}
