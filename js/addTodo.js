import { newGuid } from '../utils.js';
import { todoListRender } from './todoRender.js';

export const addTodo = ({ target, key }) => {
    const contents = target.value.replace(/ +/g, " ");
    // console.log(contents);
    if (key !== "Enter" || !contents.trim()) return;
    // console.log(contents);
    const id = newGuid(); 
    const completed = false;
    const timestamp = new Date();

    const todoItem = { contents: contents, completed: completed, timestamp: timestamp };
    localStorage.setItem(id, JSON.stringify(todoItem));

    target.value = '';
    todoListRender();
};
