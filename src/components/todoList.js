import { progressTypes } from '../utils/constants.js';
import createStore from '../store/store.js';
import reducer from '../store/reducer.js';

const todoList = () => {
    const store = createStore(reducer);
    const state = store.getState();
    
    const $listUl = document.getElementById('todo-list');

    const itemList = Object.values(state).map(obj => {
        return (`
        <li class="${obj.progress || ''}">
          <div class="view">
            <input class="toggle" type="checkbox" ${obj.progress === progressTypes.COMPLETED && 'checked'}/>
            <label class="label">${obj.content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="완료된 타이틀" />
        </li>
        `)
        }).join("");
    $listUl.innerHTML = itemList;

};

export default todoList;
