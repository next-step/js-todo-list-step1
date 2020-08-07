const ENTER_KEY = "Enter";
let cnt = 0;

let todoList = {
    init: function () {
        const _this = this;
        const inputTodo = document.querySelector("#new-todo-title");
        inputTodo.addEventListener("keydown", _this.create);
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
        console.log(++cnt + "번 실행");
        let todoList = document.querySelector("#todo-list");
        todoList.innerHTML = newTodoListItem + todoList.innerHTML;

        inputTodo.value = '';
    }
}

todoList.init();
