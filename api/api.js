const todoApi = {
  get: (KEY, defaultData = []) => {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch (e) {
      defaultData;
    }
  },
  set: (KEY, value) => {
    localStorage.setItem(KEY, JSON.stringify(value));
  },
};

export { todoApi };
