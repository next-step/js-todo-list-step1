const STORAGE_NAME = "TODOS";

const storage = (() => {
  const getStorage = () => {
    const storedItems = localStorage.getItem(STORAGE_NAME);
    return storedItems ? JSON.parse(storedItems) : [];
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
