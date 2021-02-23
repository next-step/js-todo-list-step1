import storage from "../storage.js";
import Todo from "../../domain/Todo.js";
import { FILTER } from "../../utils/FILTER.js";

const initFilter = () => {
  if (location.hash.includes(FILTER.ACTIVE)) {
    return FILTER.ACTIVE;
  } else if (location.hash.includes(FILTER.COMPLETED)) {
    return FILTER.COMPLETED;
  }
  return FILTER.ALL;
};

const todo = (() => {
  let filter = initFilter();

  const getItems = () => {
    return storage
      .getStorage()
      .map(
        ({ _id, contents, isCompleted }) => new Todo(_id, contents, isCompleted)
      );
  };

  const getNewId = () => {
    const items = getItems();
    const lastItem = items[items.length - 1];
    return lastItem ? lastItem._id + 1 : 0;
  };

  const addItem = (item) => {
    const items = getItems();
    items.push(item);
    storage.setStorage(items);
  };

  const findItemById = (items, id) => {
    return items.find((item) => item.isSameId(id));
  };

  const toggleItem = (id) => {
    const items = getItems();
    const item = findItemById(items, id);
    item.toggle();
    storage.setStorage(items);
  };

  const deleteItem = (id) => {
    const items = getItems();
    const newItems = items.filter((item) => !item.isSameId(id));
    storage.setStorage(newItems);
  };

  const editItem = (id, contents) => {
    const items = getItems();
    const item = findItemById(items, id);
    item.edit(contents);
    storage.setStorage(items);
  };

  const setFilter = (selected) => {
    filter = selected;
  };

  const getFilter = () => {
    return filter;
  };

  const getFilteredItems = () => {
    if (filter === FILTER.ACTIVE) {
      return getItems().filter((todo) => !todo.isCompleted);
    } else if (filter === FILTER.COMPLETED) {
      return getItems().filter((todo) => todo.isCompleted);
    }
    return getItems();
  };

  return {
    getNewId,
    addItem,
    toggleItem,
    deleteItem,
    editItem,
    setFilter,
    getFilter,
    getFilteredItems,
  };
})();

export default todo;
