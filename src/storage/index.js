export default Object.freeze({

  get (key = null, defaultValue = null) {
    if (key === null) return defaultValue;
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  },

  set (key, value) {
    if (key === null) return;
    return localStorage.setItem(key, JSON.stringify(value));
  }

});