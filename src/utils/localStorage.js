class LocalDB {
  constructor() {}

  getData(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`GET LocalStorage Data: ${error}`);
    }
  }

  setData(key, value = {}) {
    try {
      const jsonData = JSON.stringify(value);
      localStorage.setItem(key, jsonData);
    } catch (error) {
      console.error(`SET LocalStorage Data: ${error}`);
    }
  }
}

export default new LocalDB();
