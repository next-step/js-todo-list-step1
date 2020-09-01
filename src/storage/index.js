export const storage = Object.freeze({
  get (key) {
    return JSON.parse(localStorage.getItem(key) || 'null');
  },

  set (key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
});