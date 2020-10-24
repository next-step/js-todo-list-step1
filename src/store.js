let data = {};

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
};

const processHandler = (type, info) => {
  const handler = handlers[type];
  handler && handler(info);
};

const refresh = () => processHandler("refresh", data);

export const addTodo = (text) => {
  const todo = makeTodo(text);
  updateTodo(todo);
  refresh();
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
  refresh();
};

export const setTodoStatus = setTodo("status");

export const setTodoText = setTodo("text");

export const removeTodo = (id) => {
  data = R.omit([id])(data);
  refresh();
};

export const onChangeFilter = refresh;
