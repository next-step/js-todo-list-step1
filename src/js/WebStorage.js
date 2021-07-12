const STORAGE_KEY = 'TODO_LIST';

function WebStorage() {
  this.search = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  this.save = (data) => {
    return localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };
}

export default WebStorage;
