import { todoListRender } from './todoRender.js';

const editTodoItem = (target) => {
    const newContents = target.value.replace(/ +/g, " ");
    if(!newContents.trim()){
        alert('내용을 입력해주세요.');
        return;
    }

    const $li = target.closest('li');
    const { id } = $li.dataset;

    const localVal = JSON.parse(localStorage.getItem(id));
    localVal.contents = newContents;
    localStorage.setItem(id, JSON.stringify(localVal));

    todoListRender();
};

const revertTodoItem = (target, originVal) => {
    target.value = originVal;
    target.closest('li').classList.remove('editing');
};


export const editTodo = ({ target, key }, originVal) => {
    const keyList = {
        Enter: editTodoItem,
        Escape: revertTodoItem,
    };
    return keyList[key] && keyList[key](target, originVal);
};