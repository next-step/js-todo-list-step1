function App(){
    const $todoInput = document.querySelector('#new-todo-title')
    const $todoList = document.querySelector('#todo-list')
    let data = []
    
    function setState(text) {
        const nextData = {
            text,
            isCompleted: false
        }

        todoList.setState(nextData)
    }

    const todoList = new TodoList($todoList, data);
    const todoInput = new TodoInput($todoInput, $todoList, (text) => {
        setState(text)
    })

    
}

new App();
