import {initAddNewTodoItem} from './AddNewTodoItem.js';
import {initControlTodoItem} from './ControlTodoItem.js';
import {initEditTodoItem} from './EditTodoItem.js';
import {initControlFilterButton} from './ControlFilterButton.js';
import {initControlLocalStorage} from './ControlLocalStorage.js';

function init(){
    initAddNewTodoItem();
    initControlTodoItem();
    initEditTodoItem();
    initControlFilterButton();
    initControlLocalStorage();
}

init()