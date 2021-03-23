import { addTodo } from './addTodo.js';
import { checkTodo } from './checkTodo.js';
import { deleteTodo } from './deleteTodo.js';
import { editTodo } from './editTodo.js';

const $todoInput = document.querySelector('#new-todo-title');
const $todoList = document.querySelector('.todo-list');

const $todoApp = document.querySelector(".todoapp");
const $todoCount = $todoApp.querySelector(".todo-count > strong");

const $viewAllList = $todoApp.querySelector('.all');
const $viewTodoList = $todoApp.querySelector('.active');
const $viewDoneList = $todoApp.querySelector('ul.filters').querySelector('.completed');

export const cancelEditMode = () => {
    const $item = $todoList.querySelector('li.editing');
    if(!$item) return;
    const $editInput = $item.querySelector('input.edit');
    $editInput.value = $item.querySelector('label').innerText;
    $item.classList.remove('editing');
}

const onEditMode = ({ target }) => {
    if(!target.classList.contains('label')) return;
    // console.log(target.innerText);
    cancelEditMode();
    const originVal = target.innerText;
    const $li = target.closest('li');
    $li.classList.add('editing');
    const $childLabel = $li.querySelector('.edit');
    $childLabel.focus();

    $li.addEventListener('keyup', (event) => editTodo(event, originVal));
};

export const viewAll = () => {
    $viewAllList.classList.add('selected');
    $viewTodoList.classList.remove('selected');
    $viewDoneList.classList.remove('selected');
    todoListRender();
};

export const viewTodo = () => {
    $viewTodoList.classList.add('selected');
    $viewAllList.classList.remove('selected');
    $viewDoneList.classList.remove('selected');
    
    $todoList.querySelectorAll('li').forEach($item =>{
        $item.style.display = $item.classList.contains('completed')? 'none' : 'block';
    });

    $todoCount.innerText = localStorage.length - $todoList.querySelectorAll('li.completed').length;
};

export const viewDone = () => {
    $viewDoneList.classList.add('selected');
    $viewTodoList.classList.remove('selected');
    $viewAllList.classList.remove('selected');
    
    $todoList.querySelectorAll('li').forEach($item =>{
        $item.style.display = $item.classList.contains('completed')? 'block' : 'none';
    });

    $todoCount.innerText = $todoList.querySelectorAll('li.completed').length;
};

export const todoTrigger = () => {
    $todoInput.addEventListener('keyup', addTodo); // todo list 추가
    $todoList.addEventListener('click', checkTodo); // todo list 체크
    $todoList.addEventListener('click', deleteTodo); // todo list 삭제
    $todoList.addEventListener('dblclick', onEditMode);

    $viewAllList.addEventListener('click', viewAll); // '전체보기'
    $viewTodoList.addEventListener('click', viewTodo); // '해야할 일'
    $viewDoneList.addEventListener('click', viewDone); // '완료한 일'


};