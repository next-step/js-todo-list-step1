const generateKey = () => {
  return new Date().valueOf().toString();
};

const storage = () => {
  const localStorage = window.localStorage;
  const setItem = (key, item) =>
    localStorage.setItem(key, JSON.stringify(item));
  //TODO stringify error

  const getItem = (key) => localStorage.getItem(key);

  return {
    setItem,
    getItem,
  };
};

export { generateKey, storage };
