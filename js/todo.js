import storage from "./storage.js";

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

  return {
    addItem,
    getItems,
    findItem,
    deleteItem,
    editItem,
    toggleItem,
  };
})();

export default todo;
