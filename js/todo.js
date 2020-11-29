import storage from "./storage.js";
import filter from "./filter.js";
import { FILTER } from "./constants.js";

const todo = (() => {
  const items = storage.getStorage();

  const getItems = () => {
    return items;
  };

  const addItem = (item) => {
    items.push(item);
    storage.setStorage(items);
  };

  const findItem = (itemId) => {
    return items.find((item) => item.id === itemId);
  };

  const deleteItem = (itemId) => {
    const deleteItemIndex = items.findIndex((item) => item.id === itemId);
    items.splice(deleteItemIndex, 1);
    storage.setStorage(items);
  };

  const editItem = (id, text) => {
    const item = findItem(id);
    item.text = text;
    item.editing = false;
    storage.setStorage(items);
  };

  const toggleItem = (itemId) => {
    const item = findItem(itemId);
    item.completed = !item.completed;
    storage.setStorage(items);
  };

  const filterItems = () => {
    if (filter.getFilter() === FILTER.ALL) {
      return items;
    } else if (filter.getFilter() === FILTER.ACTIVE) {
      return items.filter((item) => !item.completed);
    } else if (filter.getFilter() === FILTER.COMPLETED) {
      return items.filter((item) => item.completed);
    }
  };

  const getNewId = () => {
    if (items.length === 0) {
      return 0;
    }
    return items[items.length - 1].id + 1;
  };

  return {
    addItem,
    getItems,
    findItem,
    deleteItem,
    editItem,
    toggleItem,
    filterItems,
    getNewId,
  };
})();

export default todo;
