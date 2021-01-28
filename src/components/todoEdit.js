import {$todoList} from "../todoDOM.js";

export const todoEdit = () => {
    $todoList.addEventListener('dblclick', inputMode);
}

const inputMode = ({target}) => {
     target.closest('li').classList.toggle('editing');

     const $edit = target.closest('li').querySelector('.edit');
     $edit.addEventListener('keyup', endInput);
}

const endInput = ({target, key}) => {
    const value = target.value;

    if(key === 'Escape'){
        target.closest('li').classList.remove('editing');
        target.value = value;
    } else if (key === 'Enter'){
        target.closest('li').classList.remove('editing');
        target.closest('li').querySelector('label').innerText = target.value;
    }
}


