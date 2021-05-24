import { todoItems } from '../utils/events.js';
import TodoCount from './TodoCount.js';

export default function TodoInput(contents) {
  this.issuedId = (todoItems.length > 0) ?todoItems[todoItems.length - 1].id + 1 : 1;
  
  const item = {
    id: this.issuedId,
    text: contents,
    done: false
  };

  todoItems.push(item);
  new TodoCount(todoItems.length);

  return item;
}