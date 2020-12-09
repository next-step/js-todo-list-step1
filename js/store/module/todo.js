import storage from "../storage.js";
import filter from "./filter.js";
import { FILTER } from "../../utils/constants.js";

const todo = (() => {
  const items = storage.getStorage();

  const defineSetter = (method) => {
    Object.defineProperty(todo, "items", {
      set: function (value) {
        storage.setStorage(value);
        method();
      },
    });
  };

  const getItems = () => {
    return items;
  };

  const addItem = (item) => {
    items.push(item);
    todo.items = items;
  };

  const findItem = (itemId) => {
    return items.find((item) => item.id === itemId);
  };

  const deleteItem = (itemId) => {
    const deleteItemIndex = items.findIndex((item) => item.id === itemId);
    items.splice(deleteItemIndex, 1);
    todo.items = items;
  };

  const editItem = (id, text) => {
    const item = findItem(id);
    item.text = text;
    item.editing = false;
    todo.items = items;
  };

  const toggleItem = (itemId) => {
    const item = findItem(itemId);
    item.completed = !item.completed;
    todo.items = items;
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
    defineSetter,
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
