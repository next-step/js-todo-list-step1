export const todoCheckbox = () => {
    const $todoList = document.querySelector('.todo-list');

    $todoList.addEventListener('click', changeTodo);
}

const changeTodo = ({target}) =>{
    if(target.className === 'toggle'){
        completeTodo(target);
    } else if(target.className === 'destroy'){
        removeTodo(target);
    }
}

const completeTodo = (target) => {
   target.toggleAttribute('checked');
   target.closest('li').classList.toggle('completed');
}

const removeTodo = (target) => {
    target.closest('li').remove();

}