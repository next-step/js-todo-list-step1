function getNextId(todoItems) {
  const index = getLastTodoIndex(todoItems);

  if (index === -1) {
    return 1;
  }

  return todoItems[index].id + 1;
}

function getLastTodoIndex(todoItems) {
  console.log(todoItems);
  return todoItems.length - 1;
}

export { getNextId };
