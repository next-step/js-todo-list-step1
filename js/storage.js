import { STORAGE_NAME } from "./constants.js";

const storage = (() => {
  const store = [];

  const initStorage = () => {
    const stored = localStorage.getItem(STORAGE_NAME);
    if (!stored) return;

    const storedItems = JSON.parse(stored);
    storedItems.forEach((item) => store.push(item));
  };

  const getStorage = () => {
    return store;
  };

  const setStorage = (todos) => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(todos));
  };

  initStorage();

  return {
    getStorage,
    setStorage,
  };
})();

export default storage;
