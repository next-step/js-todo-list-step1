export const todoFliter = () => {
    const $filters = document.querySelector('.filters');
    $filters.addEventListener('click', filtering );
}

const filtering = ({target}) => {
    const className = target.className;

    const $todoList = document.getElementById('todo-list');
    const $allTodo= $todoList.querySelectorAll('li');
    const $completedTodo = $todoList.querySelectorAll('.completed')

    if(className === 'all selected'){
        display($allTodo);
    } else if(className === 'active'){
        display($allTodo);
        hide($completedTodo);
    } else if(className === 'completed'){
        hide($allTodo);
        display($completedTodo);
    }
}

const display = (list) =>{
    for(let i=0; i<list.length; i++){
        list[i].style.display = 'block';
    }
}

const hide = (list) => {
    for(let i=0; i<list.length; i++){
        list[i].style.display = 'none';
    }
}
