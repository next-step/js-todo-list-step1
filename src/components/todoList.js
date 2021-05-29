import todoItem from './todoItem.js';

const todoList = (todoItems, option) => {
  console.log(todoItems);
  return todoItems?.map((item, index) => todoItem(item.contents));
};

export default todoList;
