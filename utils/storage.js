export const storage = {
  get: (KEY, defaultData = []) => {
    try {
      return JSON.parse(window.localStorage.getItem(KEY));
    } catch (e) {
      defaultData;
    }
  },
  set: (KEY, value) => {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  },
};
