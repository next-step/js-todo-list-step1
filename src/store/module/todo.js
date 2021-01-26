import { FILTER } from "../../utils/FILTER.js";

const todo = (() => {
  let nextId = 0;
  const items = [];
  let filter = FILTER.ALL;

  const getNewId = () => {
    return nextId++;
  };

  const addItem = (item) => {
    items.push(item);
  };

  const findItemById = (id) => {
    return items.find((item) => item.isSameId(id));
  };

  const toggleItem = (id) => {
    const item = findItemById(id);
    item.toggle();
  };

  const deleteItem = (id) => {
    const deleteItemIndex = items.findIndex((item) => item.isSameId(id));
    items.splice(deleteItemIndex, 1);
    todo.items = items;
  };

  const editItem = (id, contents) => {
    const item = findItemById(id);
    item.edit(contents);
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
