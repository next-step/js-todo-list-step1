import { TRIGGER } from "../const/CONST.js";
import { getTriggerEventName } from "../utils/element.js";
import { renderView } from "../views/todoList.js";

const todoList = [];

const addItem = (text) => {
  
  const newItem = {
    text,
    completed: false,
  };

  todoList.push(newItem);
  renderView();
}

const putItem = (id, { key, value }) => {
  todoList[Number(id)][key] = value;
  renderView();
}

export const upsertItem = (event) => {
  const { target } = event;
  const trigger = getTriggerEventName(event);

  if (trigger === TRIGGER.UPDATE_TEXT) {
    putItem(target.id, { key: 'text', value: target.value });
    stopEditing(target);
    return
  }

  if (trigger === TRIGGER.UPDATE_COMPLETED) {
    putItem(target.id, { key: 'completed', value: target.checked });
    return
  }

  addItem(target.value);
  target.value = '';
}

export const deleteItem = (id) => {
  todoList.splice(id, 1);
  renderView();
}

let filteredList = [];
const filter = {
  active: () => filteredList = todoList.filter(item => !item.completed),
  completed: () => filteredList = todoList.filter(item => item.completed),
  all: () => filteredList = [],
}

export const filterBy = (type) => {
  const filterType = filter[type];
  if (!filterType) return;

  filterType();
  renderView();
}

export const getTotalCount = () => {
  if (filteredList.length > 0) {
    return filteredList.length;
  }
  return todoList.length;
}

const mapTodoItem = (item, id) => ({ ...item, id })

export const getTodoList = () => {
  if (filteredList.length > 0) return filteredList.map((item, id) => mapTodoItem(item, id));
  return todoList.map((item, id) => mapTodoItem(item, id))
}