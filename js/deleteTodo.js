import { todoListRender } from './todoRender.js';

export const deleteTodo = ({ target }) => {
    if(!target.classList.contains('destroy')) return;

    if(!confirm('정말로 삭제하시겠습니까?')) return;
    
    const $li = target.closest('li');
    const { id } = $li.dataset;

    localStorage.removeItem(id);

    todoListRender();
};