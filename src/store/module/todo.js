import storage from "../storage.js";
import Todo from "../../domain/Todo.js";
import { FILTER } from "../../utils/FILTER.js";

const mapToTodo = (items) => {
  return items.map(
    ({ _id, contents, isCompleted }) => new Todo(_id, contents, isCompleted)
  );
};

const initFilter = () => {
  if (location.hash.includes(FILTER.ACTIVE)) {
    return FILTER.ACTIVE;
  } else if (location.hash.includes(FILTER.COMPLETED)) {
    return FILTER.COMPLETED;
  }
  return FILTER.ALL;
};

const todo = (() => {
  const items = mapToTodo(storage.getStorage());
  let nextId = items[items.length - 1]._id + 1;
  let filter = initFilter();

  const getNewId = () => {
    return nextId++;
  };

  const addItem = (item) => {
    items.push(item);
    storage.setStorage(items);
  };

  const findItemById = (id) => {
    return items.find((item) => item.isSameId(id));
  };

  const toggleItem = (id) => {
    const item = findItemById(id);
    item.toggle();
    storage.setStorage(items);
  };

  const deleteItem = (id) => {
    const deleteItemIndex = items.findIndex((item) => item.isSameId(id));
    items.splice(deleteItemIndex, 1);
    storage.setStorage(items);
  };

  const editItem = (id, contents) => {
    const item = findItemById(id);
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
      return items.filter((todo) => !todo.isCompleted);
    } else if (filter === FILTER.COMPLETED) {
      return items.filter((todo) => todo.isCompleted);
    }
    return items;
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
