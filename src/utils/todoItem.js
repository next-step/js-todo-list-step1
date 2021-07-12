function getNextId(todoItems) {
  const index = getLastTodoIndex(todoItems);

  if (index === -1) {
    return 1;
  }

  return todoItems[index].id + 1;
}

function getLastTodoIndex(todoItems) {
  return todoItems.length - 1;
}

function findTodoItem(todoItems, id) {
  return todoItems.filter((todoItem) => todoItem.id === id)[0];
}

function findTodoItemIndex(todoItems, id) {
  let targetIndex = -1;

  todoItems.forEach((todoItem, index) => {
    if (todoItem.id === id) {
      targetIndex = index;
    }
  });

  return targetIndex;
}

export { getNextId, findTodoItem, findTodoItemIndex };
