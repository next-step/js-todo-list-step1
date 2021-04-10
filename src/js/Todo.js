class Todo {
    constructor(todo) {
        const todoList = document.createElement('li');
        const view = document.createElement('div');
        const toggle = document.createElement('input');
        const label = document.createElement('label');
        const labelTest = document.createTextNode(todo);
        const destroy = document.createElement('button');
        const edit = document.createElement('input');
        let isDone = false;

        view.className = 'view';
        toggle.className = 'toggle';
        label.className = 'label';
        destroy.className = 'destroy';
        edit.className = 'edit';
        toggle.setAttribute("type", "checkbox");
        label.append(labelTest);
        edit.setAttribute("value", todo);
        view.append(toggle,label,destroy);
        
        todoList.append(view, edit);
        this._todoList = todoList;
    }

    get makeTodoList() {
        return this._todoList;
    }
}

const addTask = (todo) => {
    const newTodo = new Todo(todo);
    const todoList = document.getElementById('todo-list');
    countTodoList(todoList, 'add');
    todoList.append(newTodo.makeTodoList);
};

const editTask = ({target, key},labelArea, originalValue) => {
    switch(key) {
        case 'Enter' :
            labelArea.innerText = target.value;
            return stopEditing(target);
        case 'Escape' :
            target.value = originalValue;
            return stopEditing(target);
    }
};

const destroyTask = (target, li) => {
    const todoList = document.getElementById('todo-list');
    countTodoList(todoList, 'destroy');
    target.removeChild(li);
}

const countTodoList = (todoList, act) => {
    const todoCountHtml = document.querySelector('.todo-count').firstElementChild;
    let todoCount = 0;
    switch(act) {
        case 'add' :
            todoCount = todoList.childNodes.length + 1;
            todoCountHtml.innerText = todoCount;
            return;
        case 'destroy' :
            todoCount = todoList.childNodes.length - 1;
            todoCountHtml.innerText = todoCount;
            return;
    }
}

const stopEditing = (target) => {
    target.closest('li').removeAttribute('class');
}

const todoInput = document.getElementById('new-todo-title');
const todoListUl = document.querySelector('.todo-list'); 

todoInput.addEventListener('keydown', function() {
    if (window.event.keyCode == 13) {
        addTask(this.value);
        this.value = '';
    }
});

todoListUl.addEventListener('click', function(event) {
    const toggleCheck = event.target.closest('.toggle');
    const destroyButton = event.target.closest('.destroy');
    const li = event.target.closest('li');
    if (toggleCheck) {
        if (li.className == '') {
            li.classList.add('completed');
            toggleCheck.setAttribute('checked', '');
        } else {
            li.removeAttribute('class');
            toggleCheck.removeAttribute('checked');
        }
    }
    if (destroyButton) {
        destroyTask(this, li);
    }
});

todoListUl.addEventListener('dblclick', function(event) {
    const labelArea = event.target.closest('.label');
    const li = event.target.closest('li');
    if (!labelArea) return;

    const originalValue = labelArea.innerText;
    li.classList.add('editing');
    li.addEventListener('keyup', ({target, key}) => editTask({target, key},labelArea, originalValue))
});