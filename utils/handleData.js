export const getStorageData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const setStorageData = (key, todo) => {
  try {
    localStorage.setItem(key, JSON.stringify(todo));
  } catch (e) {
    console.log(e);
  }
};
