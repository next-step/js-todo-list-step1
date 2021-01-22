const LOCAL_STORAGE_KEY = "todos";

export const getDataFromStorage = () => {
  try {
    const jsonString = localStorage.getItem(LOCAL_STORAGE_KEY);
    return JSON.parse(jsonString);
  } catch (err) {
    console.warn(err);
  }
};

export const setDataToStorage = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, jsonString);
  } catch (err) {
    console.warn(err);
  }
};

export const generateId = () =>
  Array(16)
    .fill()
    .map((_) => "0123456789ABCDEF"[(Math.random() * 16) | 0])
    .join("");
