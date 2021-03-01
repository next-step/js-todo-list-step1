import { addTodo } from './addTodo.js';
import { checkTodo } from './checkTodo.js';
import { deleteTodo } from './deleteTodo.js';
import { editTodo } from './editTodo.js';

const $todoInput = document.querySelector('#new-todo-title');
const $todoList = document.querySelector('.todo-list');

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

export const todoTrigger = () => {
    $todoInput.addEventListener('keyup', addTodo); // todo list 추가
    $todoList.addEventListener('click', checkTodo); // todo list 체크
    $todoList.addEventListener('click', deleteTodo); // todo list 삭제
    $todoList.addEventListener('dblclick', onEditMode);

};