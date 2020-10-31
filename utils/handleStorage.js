import { STORAGE_KEY as key } from "./constantsKey.js";

export const getStorageData = () => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const setStorageData = (todo) => {
  try {
    localStorage.setItem(key, JSON.stringify(todo));
  } catch (e) {
    console.log(e);
  }
};
