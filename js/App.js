const renderNewToDoTemplate = (idx, title, completed) => {
    return ` <li data-idx = ${idx} class=${completed ? 'completed' : ''}>
                    <div class="view">
                        <input class="toggle" type="checkbox" ${
        completed ? 'checked' : ''
    }>
                        <label class="label">${title}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="새로운 타이틀">
                </li>`;
};
let todoList = {
    todoItems: [],
    status: 'all'
}

const init = () => {
    const localTodoList = JSON.parse(localStorage.getItem('todo'));

    if (localTodoList) {
        todoList = {
            ...localTodoList
        }
    }
    const $inputTodo = document.getElementById('new-todo-title');
    const $AStatusOfActive = document.querySelector('a.active');
    const $AStatusOfCompleted = document.querySelector('a.completed');
    const $AStatusOfAll = document.querySelector('a.all');
    $inputTodo.addEventListener('keyup', handleInputCompleted);
    $AStatusOfAll.addEventListener('click', handleAClicked);
    $AStatusOfActive.addEventListener('click', handleAClicked);
    $AStatusOfCompleted.addEventListener('click', handleAClicked);
    render(todoList);
}

const render = (todoList) => {
    const $liTodoList = document.getElementById('todo-list');
    const $inputNewTodoTitle = document.querySelector('#new-todo-title');
    const $spanTodoListCount = document.querySelector('.todo-count strong');
    $liTodoList.innerHTML = '';
    let renderList = [];

    switch (todoList.status) {
        case 'all selected' :
            renderList = todoList.todoItems;
            break;
        case 'completed' :
            renderList = todoList.todoItems.filter(todoItem => todoItem.completed);
            break;
        case 'active' :
            renderList = todoList.todoItems.filter(todoItem => !todoItem.completed);
            break;
        default :
            return;

    }

    renderList.forEach((renderItem, index) => {
        const $liTodo = document.createElement('li');


        $liTodo.innerHTML = renderNewToDoTemplate(index, renderItem.todoTitle, renderItem.completed);
        const $inputEdit = $liTodo.querySelector('.edit');
        const $checkBoxToggle = $liTodo.querySelector('.toggle');
        const $btnDestroy = $liTodo.querySelector('.destroy');


        $checkBoxToggle.addEventListener('change', handleChangeCheckBox);
        $inputEdit.addEventListener('keyup', handleInputKeyUpInEditing);
        $btnDestroy.addEventListener('click', handleClickedDestroy);
        $liTodo.addEventListener('dblclick', handleDoubleClick);

        if(renderItem.editing) $liTodo.className = 'editing';
        $liTodoList.append($liTodo);
    });

    $inputNewTodoTitle.value = '';
    $spanTodoListCount.textContent = renderList.length;
    localStorage.setItem('todo', JSON.stringify(todoList));

}


const getLiIndex = ({target}) => {
    return target.parentNode.parentNode.dataset.idx;
}

const handleDoubleClick = (e) => {

    const index = getLiIndex(e);
    if(index === undefined) return;
    todoList.todoItems[index].editing = true;
    render(todoList);
}
const handleClickedDestroy = (e) => {
    const index = getLiIndex(e);
    todoList.todoItems.splice(index, 1);
    render(todoList);
}

const handleChangeCheckBox = (e) => {
    const index = getLiIndex(e);
    todoList.todoItems[index].completed = e.target.checked;
    render(todoList);
}

const handleInputKeyUpInEditing = (e) => {
    const index = e.target.parentNode.dataset.idx;
    switch (e.key) {
        case 'Escape' :
            todoList.todoItems[index].editing = false;
            break;
        case 'Enter' :
            todoList.todoItems[index] = {...todoList.todoItems[index], todoTitle: e.target.value, editing: false};
            break;
        default :
            return;
    }
    render(todoList);
}
const handleInputCompleted = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
        const todoItem = {
            todoTitle: e.target.value,
            completed: false,
            editing: false,
        }
        todoList.todoItems = [...todoList.todoItems, todoItem];
        render(todoList)
    }
}
const handleAClicked = (e) => {
    switch (e.target.className) {
        case 'all selected' :
            todoList.status = 'all selected';
            break;
        case 'active' :
            todoList.status = 'active';
            break;
        case 'completed' :
            todoList.status = 'completed';
            break;
        default :
            break;
    }
    render(todoList);
}

window.addEventListener("load", init);
