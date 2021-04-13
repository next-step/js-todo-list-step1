import { TodoItem, todoItemTemplate } from "./components/TodoItem.js";

var todoInput = document.getElementById('new-todo-title');
var todoList = document.getElementById('todo-list');
var todoCount = document.querySelector('strong');

var btn_all = document.querySelector('.all');
var btn_active = document.querySelector('.active');
var btn_completed = document.querySelector('.completed');

var todoItems = new TodoItem(JSON.parse(localStorage.getItem('todoItems')));

var todoItemID = (todoItems !== undefined && todoItems !== null) ? todoItems.length : 0;

window.onload = () => {
    todoInput.addEventListener('keydown', onChangeTodoInput);

    btn_all.addEventListener('click', showAllTodoList);
    btn_active.addEventListener('click', showActiveTodoList);
    btn_completed.addEventListener('click', showCompletedTodoList);

    render(todoItems);
}

const addTodoItem = (contents) => {
    let item = {
        id : todoItemID++,
        status : "view",
        contents : contents
    }
    
    todoItems.push(item);
    render(todoItems);
}

const onChangeTodoInput = (e) => {    
    if (e.keyCode === 13) {
        addTodoItem(e.target.value);
        e.target.value = "";
    }
}

const render = (items) => {
    let template = items.map(item => todoItemTemplate(item));
    todoList.innerHTML = template.join("");

    todoList.addEventListener('click', onToggleTodoItem);
    todoList.addEventListener('dblclick', onModifyTodoItem);
    todoList.addEventListener('keydown', onChangeTodoItem)
    todoList.addEventListener('click', onDestroyTodoItem);
    
    todoCount.innerHTML = todoItems.length;

    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

const showAllTodoList = () => {
    btn_all.classList.add("selected");
    btn_active.classList.remove("selected");
    btn_completed.classList.remove("selected");

    render(todoItems);
}

const showActiveTodoList = () => {
    btn_all.classList.remove("selected");
    btn_active.classList.add("selected");
    btn_completed.classList.remove("selected");

    render(todoItems.filter(item => item.status !== "completed"));
}

const showCompletedTodoList = () => {
    btn_all.classList.remove("selected");
    btn_active.classList.remove("selected");
    btn_completed.classList.add("selected");

    render(todoItems.filter(item => item.status === "completed"));
}

const onToggleTodoItem = (e) => {
    if (e.target.className === "toggle") {
        todoItems = todoItems.map(
            item => {
                if (item.id == e.target.id) {
                    return item = {
                        ...item,
                        status : "completed"
                    }
                } else {
                    return item;
                }
            }
        );

        render(todoItems);
    }
}

const onDestroyTodoItem = (e) => {
    if (e.target.className === "destroy") {
        if (confirm("정말 삭제하시겠습니까?") == true) {            
            todoItems = todoItems.filter(item => item.id != e.target.id);
            
            render(todoItems);
        } else {
            return;
        }
    }
}

const onModifyTodoItem = (e) => {
    if (e.target.className === "label") {
        todoItems = todoItems.map(
            item => {
                if (item.id == e.target.id) {
                    return item = {
                        ...item,
                        beforeStatus : item.status,
                        status : "editing"
                    }
                } else {
                    return item;
                }
            }
        );

        render(todoItems);
    }
}

const onChangeTodoItem = (e) => {
    if (e.target.className === "edit") {
        if (e.keyCode === 13) {
            if (e.target.value !== "") {
                todoItems = todoItems.map(
                    item => {
                        if (item.id == e.target.id) {
                            return item = {
                                ...item,
                                contents : e.target.value,
                                status : item.beforeStatus
                            }
                        } else {
                            return item;
                        }
                    }
                );

                render(todoItems);
            }
        } else if (e.keyCode === 27) {
            todoItems = todoItems.map(
                item => {
                    if (item.id == e.target.id) {
                        return item = {
                            ...item,
                            status : item.beforeStatus
                        }
                    } else {
                        return item;
                    }
                }
            );

            render(todoItems);
        }
    }
}