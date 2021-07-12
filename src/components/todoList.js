import todoItem from './todoItem.js';

const todoList = (todoItems, option) => {
  return todoItems
    ?.map((item, index) =>
      todoItem(item.contents, index, item.completed, item.editing)
    )
    .join('');
};

export default todoList;
