

const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
const $countContainer = document.querySelector(".count-container");
const $todoCount = $countContainer.querySelector(".todo-count strong")
const $filters = $countContainer.querySelector(".filters");

const storage = window.localStorage;

let todoListItems = [];
let filterStatus = "all";

const saveTodo = () => {
    const value = JSON.stringify(todoListItems);
    storage.setItem("todo", value);
};

const loadTodo = () => {
    const value = storage.getItem("todo");
    todoListItems = [...JSON.parse(value)];
};

const renderTodoList = (items, status) => {
    $todoList.innerHTML = "";
    let count = 0;
    items.forEach(item => {
        if(status && status === "all" || status === item.status){
            createTodoItem(item);
            count += 1;
        }
    });
    $todoCount.innerText = count;
}

const createTodoItem = (item) => {
    const $li = document.createElement("li");
    const isCompleted = item.status === "completed";
    $li.id = item.id;
    $li.classList.add(item.status);
    $li.innerHTML = `
         <div class="view">
            <input class="toggle" type="checkbox" ${isCompleted ? "checked" : ""}/>
            <label class="label">${item.title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.title}" />
    `
    $todoList.append($li);
};


const addTodoList = (e) => {
    const todoValue = e.target.value.trim();
    const keycode = e.code;
    if(todoValue && (keycode === 'Enter' || keycode === 'NumpadEnter')) {
        e.preventDefault();
        const item = {
            id: Math.random().toString(36).substr(2,11), 
            title:todoValue, 
            status:"active",
        };
        todoListItems.push(item);
        rerender(filterStatus);
        e.target.value = "";
    }
};

const getIndex = (id) => todoListItems.findIndex((item) => {
        return item.id === id;
    });

const onToggleItemCheckbox = (e) => {
    if(e.target && e.target.nodeName === "INPUT" && e.target.classList.contains("toggle")){
        const $li = e.target.closest("li");
        const idx = getIndex($li.id);
        if(e.target.checked){
            todoListItems[idx].status = "completed"
            $li.classList.add("completed");
        } else {
            todoListItems[idx].status = "active"
            $li.classList.remove("completed");
        }
        rerender(filterStatus);
    }
};

const deleteTodoList = (e) => {
    if(e.target && e.target.nodeName === "BUTTON" && e.target.classList.contains("destroy")){
        const $li = e.target.closest("li");
        const idx = getIndex($li.id);
        if(idx > -1) {
            todoListItems.splice(idx, 1);
        }
        rerender(filterStatus);
    }
};

const onEditMoed = (e) => {
    if(e.target && e.target.nodeName === "LABEL" && e.target.classList.contains("label")){
        const $li = e.target.closest("li");
        if(!$li.classList.contains("completed")){
            $li.classList.add("editing");
            const $editBox = $li.querySelector("input.edit");
            const temp = $editBox.value;
            $editBox.focus();
            $editBox.value = "";
            $editBox.value = temp;
        } 
    }
};

const modifyTodoList = (e) => {
    if(e.target && e.target.nodeName === "INPUT" && e.target.classList.contains("edit")){
        const keycode = e.code;
        const $li = e.target.closest("li");
        const temp = e.target.value;
        if(keycode === 'Escape') {
            e.target.value = temp;
            $li.classList.remove("editing");

        } else if(keycode === 'Enter' || keycode === 'NumpadEnter'){
            const idx = getIndex($li.id);
            if(idx > -1){
                todoListItems[idx].title = e.target.value;
                rerender(filterStatus);
            }
        }
    }
};

const changeFilter = (e) => {
    if(e.target && e.target.nodeName === "A") {
        const filters = $filters.querySelectorAll('li a');
        filters.forEach((el) => {
            el.classList.remove("selected");
        });
        e.target.classList.add("selected");
        filterStatus = e.target.classList[0];
        rerender(filterStatus);
    }
};


const rerender = (filter) => {
    saveTodo();
    renderTodoList(todoListItems, filter);
};

$todoInput.addEventListener("keypress", addTodoList);
$todoList.addEventListener("click", onToggleItemCheckbox);
$todoList.addEventListener("click", deleteTodoList);
$todoList.addEventListener("dblclick", onEditMoed);
$todoList.addEventListener("keydown", modifyTodoList);
$filters.addEventListener("click", changeFilter);

window.onload = () => {
    try{
        loadTodo();
    }catch{};
    renderTodoList(todoListItems, filterStatus);
}
