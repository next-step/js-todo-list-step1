const ENTER_KEY = "Enter";

const COMPLETED_CLASS_NAME = "completed";
let todoList = {
    init: function () {
        const _this = this;
        const inputTodo = document.querySelector("#new-todo-title");
        inputTodo.addEventListener("keydown", _this.create);

        let todoList = document.querySelector(".todo-list");
        todoList.addEventListener("click", (e) => {
            if (e.target.nodeName === "INPUT") {
                _this.check(e);
                return;
            }
        });
    },
    create: function (e) {
        if (e.key !== ENTER_KEY) {
            return;
        }

        const inputTodo = e.target;
        const inputValue = inputTodo.value;
        if (inputValue === '') {
            alert("할 일을 입력하세요!");
            return;
        }

        let todoListItem = document.querySelector("#todo-list-item").innerHTML;
        let newTodoListItem = todoListItem.replace("{title}", inputValue)
            .replace("{title}", inputValue);

        let todoList = document.querySelector("#todo-list");
        todoList.innerHTML = newTodoListItem + todoList.innerHTML;

        inputTodo.value = '';
    },
    check: function (e) {
        let checkedStatus = e.target.checked;
        let todoListItem = e.target.offsetParent;
        if (checkedStatus) {
            todoListItem.setAttribute("class", COMPLETED_CLASS_NAME);
            return;
        }
        todoListItem.removeAttribute("class");
    },
}

todoList.init();
