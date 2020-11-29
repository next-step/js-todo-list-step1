import { STORAGE_NAME } from "../constants.js";

const storage = (() => {
  const getStorage = () => {
    const storedItems = localStorage.getItem(STORAGE_NAME);
    return JSON.parse(storedItems);
  };

  const setStorage = (todos) => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(todos));
  };

  return {
    getStorage,
    setStorage,
  };
})();

export default storage;
