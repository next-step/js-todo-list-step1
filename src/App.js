import store from './store/index.js'; 

import Count from './components/count.js';
import List from './components/list.js';
import Input from './components/input.js';
import Filter from './components/filter.js';

const countInstance = new Count();
const listInstance = new List();
const InputInstance = new Input();
const FilterInstance = new Filter();

countInstance.render();
listInstance.render();
InputInstance.render();
FilterInstance.render();

const initLoad = () => {
    const loadedToDos = localStorage.getItem('todoList');
    if(loadedToDos){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach((todo)=>{
            store.dispatch('addToDo', todo);
        });
    }
};

initLoad();


