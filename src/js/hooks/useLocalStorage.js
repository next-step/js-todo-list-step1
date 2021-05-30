const useLocalStorage = (key) => {
  const getData = () => {
    try {
      const json = localStorage.getItem(key);
      return JSON.parse(json);
    } catch (e) {
      console.error(e);
    }
  };

  const setData = (value) => {
    try {
      const json = JSON.stringify(value);
      localStorage.setItem(key, json);
    } catch (e) {
      console.error(e);
    }
  };

  return [getData, setData];
};

export default useLocalStorage;
