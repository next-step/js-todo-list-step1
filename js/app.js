import todoItem from './todoItem.js';
const DATA = []

const todoInputElement = document.getElementById('new-todo-title')
const todoListElement = document.getElementById('todo-list')

todoInputElement.addEventListener('keyup', (event) => {
    const key = event.key 
    if (key === "Enter") {
        let data = {
            id: DATA.length + 1,
            context: 'test',// input value
            complete: false
        }
    }
})


todoListElement.addEventListener('dblclick', (event) => {
    // 입력된 값 수저하는 기능
})
console.log('app.js' );
// todoItem();