function App(){
    const $todoInput = document.querySelector('#new-todo-title')
    const $todoList = document.querySelector('#todo-list')
    let data = []
    
    function addItem(text) {
        const nextData = {
            text,
            isCompleted: false
        }

        todoList.addItem(nextData)
    }

    const todoList = new TodoList($todoList, data)
    const todoInput = new TodoInput($todoInput, $todoList, (text) => {
        addItem(text)
    })

    
}

new App();
