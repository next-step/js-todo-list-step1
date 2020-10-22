let data = {};

const handlers = {};

const getKey = () => Date.now();

const makeTodo = (text) => ({
  key: getKey(),
  text,
  status: "none",
});

const updateTodo = (todo) => {
  data = {
    ...data,
    [todo.key]: todo,
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

export const setTodoStatus = (key, status) => {
  const todo = data[key];
  if (!todo) {
    return;
  }
  data = R.assocPath([key, "status"], status)(data);
  refresh();
};

export const removeTodo = (key) => {
  data = R.omit([key])(data);
  refresh();
};
