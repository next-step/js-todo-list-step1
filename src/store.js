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

export const addTodo = (text) => {
  const todo = makeTodo(text);
  updateTodo(todo);
  processHandler("refresh", data);
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
  processHandler("refresh", data);
};
