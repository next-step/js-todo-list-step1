import { STORAGE_NAME } from './constant.js';

const storage = window.localStorage;

const localStorage = {
  setItem: (value) => {
    try {
      storage.setItem(STORAGE_NAME, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  },
  getItem: () => JSON.parse(storage.getItem(STORAGE_NAME)) || [],
};

export default localStorage;
