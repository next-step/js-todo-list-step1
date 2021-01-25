export const todoEdit = () => {
    const $todoList = document.querySelector('.todo-list');

    $todoList.addEventListener('dblclick', inputMode);
}

const inputMode = ({target}) => {
     target.closest('li').classList.toggle('editing');
     console.log(target);
}

const endInput = ({target, key}) => {
    if(key === 'escape'){
        
    }
}


