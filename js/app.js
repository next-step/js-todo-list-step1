function App() {
    const $todoInput = document.querySelector('#new-todo-title')
    const $todoList = document.querySelector('#todo-list')
    const $todoCount = document.querySelector('.todo-count')
    const data = []

    function addItem(text) {
        data.push({
            text,
            isCompleted: false
        })

        todoList.updateItem(data)
        todoCount.render(data.length)
    }

    function removeItem(index) {
        data.splice(index, 1)

        todoList.updateItem(data)
        todoCount.render(data.length)
    }

    const todoList = new TodoList($todoList, data, (index) => {
        removeItem(index)
    })
    const todoInput = new TodoInput($todoInput, (text) => {
        addItem(text)
    })
    const todoCount = new TodoCount($todoCount, data.length)
}

new App()
