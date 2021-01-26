import storage from "../storage.js";
import Todo from "../../domain/Todo.js";
import { FILTER } from "../../utils/FILTER.js";

const mapToTodo = (items) => {
  return items.map(
    ({ _id, contents, isCompleted }) => new Todo(_id, contents, isCompleted)
  );
};

const todo = (() => {
  const items = mapToTodo(storage.getStorage());
  let nextId = 0;
  let filter = FILTER.ALL;

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
    getFilteredItems,
  };
})();

export default todo;
