import TodoList from './components/TodoList.js';

const todoListUl = document.getElementById('todo-list');
const todoTitle = document.getElementById('new-todo-title');
const todoLocalData = localStorage.getItem('item');
const todoData = todoLocalData ? JSON.parse(todoLocalData) : [];
const todoList = new TodoList({
    todoList: todoListUl,
    data: todoData
})

todoTitle.onkeydown = function(e){
    if (e.keyCode === 13) {
        const title = e.target.value.trim();

        todoData.push({completed: false, title});
        localStorage.setItem('item', JSON.stringify(todoData));

        if (title.length > 0) {
            todoList.setState(todoData);
        }
        e.target.value = '';
    }
};

// function getItem(){
//     if(!todoData) return;
//     todoData.map(data => {
//         setItem(data.title);
//     })
// }
