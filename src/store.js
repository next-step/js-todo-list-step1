import { getData, saveData } from "./db.js";

const DATA_KEY = "todo";

let data = getData(DATA_KEY);
const save = () => R.pipe(R.map(R.omit(["node"])), saveData(DATA_KEY))(data);
const handlers = {};

const getID = () => Date.now();

const makeTodo = (text) => ({
  id: getID(),
  text,
  status: "none",
});

const updateTodo = (todo) => {
  data = {
    ...data,
    [todo.id]: todo,
  };
  save();
  refresh();
};

const processHandler = (type, info) => {
  const handler = handlers[type];
  handler && handler(info);
};

const refresh = () => processHandler("refresh", data);

export const addTodo = (text) => {
  const todo = makeTodo(text);
  updateTodo(todo);
};

export const setTodoHandler = (type, handler) => {
  handlers[type] = handler;
};

const setTodo = (key) => (id, value) => {
  const todo = data[id];
  if (!todo) {
    return;
  }
  data = R.assocPath([id, key], value)(data);
  save();
  refresh();
};

export const setTodoStatus = setTodo("status");

export const setTodoText = setTodo("text");

export const removeTodo = (id) => {
  data = R.omit([id])(data);
  save();
  refresh();
};

export const onChangeFilter = refresh;
