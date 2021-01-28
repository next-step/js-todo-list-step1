import {$todoList} from "../todoDOM.js";
import {todoCount} from "./todoCount.js";

export const todoFliter = () => {
    const $filters = document.querySelector('.filters');
    $filters.addEventListener('click', filtering );
}

export let filterStatus = 'all';

// 클릭하는 필터에 따라 보이는 투두리스트와 count 수가 변경됨
const filtering = ({target}) => {

    const $allTodo= $todoList.querySelectorAll('li');
    const $completedTodo = $todoList.querySelectorAll('.completed')

    // className을 배열로 받아와서 0번째 값을 filterStatus에 넣는 것은 ?
    const className = target.className;

    if(className === 'all selected'){
        display($allTodo);

        // 필터 버튼을 클릭했을 때 보이는 todo 수 변경
        filterStatus = 'all';
        todoCount(filterStatus);
    } else if(className === 'active'){
        display($allTodo);
        hide($completedTodo);

        filterStatus = 'active';
        todoCount(filterStatus);
    } else if(className === 'completed'){
        hide($allTodo);
        display($completedTodo);

        filterStatus = 'completed';
        todoCount(filterStatus);
    }
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
