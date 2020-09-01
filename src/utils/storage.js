export const storage = {
  get: (KEY, defaultData = []) => {
    try {
      return JSON.parse(window.localStorage.getItem(KEY));
    } catch (e) {
      defaultData;
    }
  },
  set: (KEY, value) => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  },
};
