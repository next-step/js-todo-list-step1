import {initAddNewTodoItem} from './AddNewTodoItem.js';
import {initControlTodoItem} from './ControlTodoItem.js';
import {initEditTodoItem} from './EditTodoItem.js';
import {initControlFilterItem} from './ControlFilterItem.js';
import {initControlLocalStorage} from './ControlLocalStorage.js';

function init(){
    initAddNewTodoItem();
    initControlTodoItem();
    initEditTodoItem();
    initControlFilterItem();
    initControlLocalStorage();
}

init()