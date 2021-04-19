import Todo from "./Todo.js"
const todoApp = new Todo();
const inputTodo = () => { 
    todoApp.todoInput.addEventListener('keydown', function() {
        if (window.event.keyCode == 13) {
            todoApp.add(this.value);
            this.value = '';
        }
    })
};

const clickTodo = () => { 
    todoApp.todoList.addEventListener('click', function(event) {
    const toggleCheck = event.target.closest('.toggle');
    const destroyButton = event.target.closest('.destroy');
    const li = event.target.closest('li');
        if (toggleCheck) {
            todoApp.changeTodoState(li, toggleCheck);
        }
        if (destroyButton) {
            todoApp.destroy(this, li);
        }
    })
}

const editTodo = () => {
    todoApp.todoList.addEventListener('dblclick', function(event) {
        const labelArea = event.target.closest('.label');
        const li = event.target.closest('li');
        if (!labelArea) return;

        const originalValue = labelArea.innerText;
        li.classList.add('editing');
        li.addEventListener('keyup', ({target, key}) => todoApp.edit({target, key},labelArea, originalValue))
    })
}

const changeTypeTodo = () => { 
    todoApp.todoFilter.addEventListener('click', function(event) {
        const statusList = {
            all () {
                todoApp.allList()
            },
            active () {
                todoApp.activeList()
            },
            completed () {
                todoApp.completedList()
            }
        }
        statusList[event.target.id]();
        initClassList(event, this);
    })
}

const initClassList = (event, target) => {
    for (let item of target.children) {
        item.children[0].classList.remove('selected');
    }
    event.target.classList.add('selected');
}

export {inputTodo, clickTodo, editTodo, changeTypeTodo};