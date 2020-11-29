const LOCAL_NAME = "TODOS";

const storage = (() => {
  const store = [];

  const initStorage = () => {
    const stored = localStorage.getItem(LOCAL_NAME);
    if (!stored) return;

    const storedItems = JSON.parse(stored);
    storedItems.forEach(item => store.push(item));
  };

  const getStorage = () => {
    return store;
  }

  const setStorage = (todos) => {
    localStorage.setItem(LOCAL_NAME, JSON.stringify(todos));
  };

  initStorage();

  return {
    getStorage,
    setStorage,
  }
})()

export default storage;
