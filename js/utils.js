export const useLocalStorage = (localStorageKey) => {
  const getDataFromStorage = () => {
    try {
      const jsonString = localStorage.getItem(localStorageKey);
      return JSON.parse(jsonString);
    } catch (err) {
      console.warn(err);
    }
  };
  const setDataToStorage = (data) => {
    try {
      const jsonString = JSON.stringify(data);
      localStorage.setItem(localStorageKey, jsonString);
    } catch (err) {
      console.warn(err);
    }
  };

  return [getDataFromStorage, setDataToStorage];
};

export const generateId = () =>
  Array(16)
    .fill()
    .map((_) => "0123456789ABCDEF"[(Math.random() * 16) | 0])
    .join("");
