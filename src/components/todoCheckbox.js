import {$todoList} from "../todoDOM.js";
import {todoCount} from "./todoCount.js";

export const todoCheckbox = () => {
    $todoList.addEventListener('click', changeTodo);
}

const changeTodo = ({target}) =>{
    if(target.className === 'toggle'){
        completeTodo(target);
    } else if(target.className === 'destroy'){
        removeTodo(target);
    }
}

// todo list의 체크박스를 클릭하여 complete 상태로 변경
const completeTodo = (target) => {
   target.toggleAttribute('checked');
   target.closest('li').classList.toggle('completed');
}

// todo list의 x버튼을 클릭하여 해당 엘리먼트 삭제
const removeTodo = (target) => {
    target.closest('li').remove();

    // todo를 삭제할 때마다 count 수 변경
    todoCount('all');

}