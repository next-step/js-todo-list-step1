function App(){
    const $todoInput = document.querySelector('#new-todo-title')
    const $todoList = document.querySelector('#todo-list')
    
    const todoInput = new TodoInput($todoInput, $todoList)
    const todoList = new TodoList($todoList)
}

new App();