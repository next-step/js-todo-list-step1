export function isFunction(func) {
  return typeof func === "function";
}

export function isValidTodoItems(todoItems) {
  if (!Array.isArray(todoItems)) return false;
  return todoItems.every((todoItems) => isValidTodoItem(todoItems));
}

export function isValidTodoItem(todoItem) {
  if (
    todoItem &&
    "_id" in todoItem &&
    typeof todoItem._id === "string" &&
    "content" in todoItem &&
    typeof todoItem.content === "string" &&
    "isCompleted" in todoItem &&
    typeof todoItem.isCompleted === "boolean"
  )
    return true;

  return false;
}

export function createUniqueId() {
  return Date.now().valueOf().toString() + Math.floor(Math.random() * 1000);
}

export const ESC_KEY = "Escape";
