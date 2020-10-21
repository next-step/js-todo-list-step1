let data = {};

const handlers = {};

const getKey = () => Date.now();

const makeTodo = (text) => ({
  key: getKey(),
  text,
  isComplete: false,
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
  processHandler("add", todo);
};

export const setTodoHandler = (type, handler) => {
  handlers[type] = handler;
};

