import {$todoList} from "../todoDOM.js";
import {todoCount} from "./todoCount.js";

export const todoFliter = () => {
    const $filters = document.querySelector('.filters');
    $filters.addEventListener('click', filtering );
}

export let filterStatus = 'all';

const filtering = ({target}) => {

    const $allTodo= $todoList.querySelectorAll('li');
    const $completedTodo = $todoList.querySelectorAll('.completed')

    filterStatus = target.classList.item(0);

    if(filterStatus === 'all'){
        display($allTodo);
    } else if(filterStatus === 'active'){
        display($allTodo);
        hide($completedTodo);
    } else if(filterStatus === 'completed'){
        hide($allTodo);
        display($completedTodo);
    }

    // filter적용했을 때 count 수 변경
    todoCount(filterStatus);
}


const display = (list) =>{
    for(let i=0; i<list.length; i++){
        list[i].style.display = 'block';
    }
}

const hide = (list) => {
    for(let i=0; i<list.length; i++){
        list[i].style.display = 'none';
    }
}
