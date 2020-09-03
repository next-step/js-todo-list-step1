class TodoApp {
    constructor () {
        this.state = {
            todoItem: [],
        }
    }
    // todoItem state 변경
    setState (updatedItems) {
        this.state.todoItem = updatedItems;
        // todoItems 가 변화하면 영향을 받아야 하는 것들 추가적으로 작성
    }

};
const todoApp = new TodoApp();

const $input = document.getElementById('new-todo-title');
$input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {}
});
