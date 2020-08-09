const ENTER_KEY = "Enter";
const COMPLETED_CLASS_NAME = "completed";
const EDITING_CLASS_NAME = "editing";

let todoList = {
    init: function () {
        const _this = this;
        const inputTodo = document.querySelector("#new-todo-title");
        inputTodo.addEventListener("keyup", _this.create);

        let todoList = document.querySelector(".todo-list");
        todoList.addEventListener("click", e => {
            if (e.target.nodeName === "INPUT") {
                _this.check(e);
                return;
            }

            if (e.target.nodeName === "BUTTON") {
                _this.delete(e);
            }
        });

        todoList.addEventListener("dblclick", (e) => {
            if (e.target.nodeName === "LABEL") {
                _this.update(e);
            }
        });

        todoList.addEventListener("keyup", e => {
            if (e.key !== ENTER_KEY) {
                return;
            }
            let todoItemClass = e.target.offsetParent;
            if (todoItemClass.className === EDITING_CLASS_NAME) {
                let updatedTitle = e.target.value;
                let todoItemLabel = e.target.offsetParent.children[0].children[1];
                todoItemLabel.innerText = updatedTitle;
                todoItemClass.classList.remove(EDITING_CLASS_NAME);
                return;
            }
        });

        let todoItemsNumber = todoList.childElementCount;
        let todoCount = document.querySelector(".todo-count");
        todoCount.innerText = "총 " + todoItemsNumber + " 개";
    },
    create: function (e) {
        if (e.key !== ENTER_KEY) {
            return;
        }

        const inputTodo = e.target;
        const inputValue = inputTodo.value;
        if (inputValue === '') {
            return;
        }

        let todoListItem = document.querySelector("#todo-list-item").innerHTML;
        let newTodoListItem = todoListItem.replace("{title}", inputValue)
            .replace("{title}", inputValue);

        let todoList = document.querySelector("#todo-list");
        todoList.innerHTML += newTodoListItem;

        inputTodo.value = '';
    },
    check: function (e) {
        let checkedStatus = e.target.checked;
        let todoListItem = e.target.offsetParent;
        if (checkedStatus) {
            todoListItem.classList.add(COMPLETED_CLASS_NAME);
            return;
        }
        todoListItem.classList.remove(COMPLETED_CLASS_NAME);
    },
    update: function (e) {
        let todoListItem = e.target.parentElement.parentElement;
        if (todoListItem.className === COMPLETED_CLASS_NAME) {
            return;
        }
        todoListItem.classList.add(EDITING_CLASS_NAME);
    },
    delete: function (e) {
        e.target.offsetParent.remove();
    }
}

todoList.init();
