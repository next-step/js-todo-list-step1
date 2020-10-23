export const getStorageData = (key) => {
  try {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const setStorageData = (key, todo) => {
  try {
    localStorage.setItem(key, JSON.stringify(todo));
  } catch (e) {
    console.log(e);
  }
};
