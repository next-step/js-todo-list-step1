const TODO_STORAGE_KEY = '@todo-database';
const storage = window.localStorage;

const localStorage = {
  /**
   * @param {object[]} value
   */
  setItem: (value) => {
    try {
      storage.setItem(TODO_STORAGE_KEY, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  },
  /**
   * @returns {object[]}
   */
  getItem: () => JSON.parse(storage.getItem(TODO_STORAGE_KEY)) || [],
};

export default localStorage;
