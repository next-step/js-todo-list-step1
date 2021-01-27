import {$todoList} from "../todoDOM.js";

export const todoCount = (status) => {
    const countNum = countFilter(status);
    const $countContainer = document.querySelector('.todo-count');
    
    $countContainer.innerHTML = countTemplate(countNum);
}

const countFilter = (status) => {

    // 전체 todo 수
    const countAll = $todoList.getElementsByClassName('toggle').length;

    // 완료한 todo 수
    const countCompletedTodo = $todoList.getElementsByClassName('completed').length;

    // filter 상태에 따른 todo 수
    if(status === 'all'){
        return countAll;
    } else if(status === 'active'){
        return countAll - countCompletedTodo;
    } else if(status === 'completed'){
        return countCompletedTodo;
    }
}


const countTemplate= (count) => {
    return `총 <strong>${count}</strong> 개`;
}
