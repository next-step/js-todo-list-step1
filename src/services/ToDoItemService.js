import storage from '../storage';

const STORE_KEY = 'todoItems'

export default Object.freeze({

  fetchAll () {
    return storage.get(STORE_KEY) || [];
  },

  put (todoItems) {
    storage.set(STORE_KEY, todoItems);
  },

})