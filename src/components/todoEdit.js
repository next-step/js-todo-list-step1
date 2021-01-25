export const todoEdit = () => {
    const $todoList = document.querySelector('.todo-list');

    //todo list를 더블클릭하면 input모드로 변경
    $todoList.addEventListener('dblclick', inputMode);
}

const inputMode = ({target}) => {
     target.closest('li').classList.toggle('editing');

     const $edit = target.closest('li').querySelector('.edit');
     $edit.addEventListener('keyup', endInput);
}

const endInput = ({target, key}) => {
    const value = target.value;

    // esc를 누르면 수정되지 않은채 view모드로 복귀
    if(key === 'Escape'){
        target.closest('li').classList.remove('editing');
        target.value = value;
    } else if (key === 'Enter'){
        target.closest('li').classList.remove('editing');
        target.closest('li').querySelector('label').innerText = target.value;
    }
}


