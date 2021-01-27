import {$todoList,$newTodoTitle} from "../todoDOM.js";

export const todoCount = () => {

    countUp();

    // item이 추가될 때 카운트 수 업데이트
    $newTodoTitle.addEventListener('keyup', countUp);

    // item이 삭제될 때 카운트 수 업데이트
    $todoList.addEventListener('click', countUp);
}

const countUp = () => {
    const count = document.getElementsByClassName('toggle').length;
    const $countContainer = document.querySelector('.todo-count');
    
    $countContainer.innerHTML = countInput(count);
}

const countInput = (count) => {
    return `총 <strong>${count}</strong> 개`;
}