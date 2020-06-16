export const sortData = (newTodo, data, id) => {
  const restData = data.filter((todo) => todo.id.toString() !== id);
  const nextData = [...restData, newTodo].sort((a, b) => {
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 1;
  });
  return nextData;
};
