import TodoApp from "./components/TodoApp.js";
const todoInputElement = document.querySelector('#new-todo-title')
const todoListElement = document.querySelector('#todo-list')
const todoCountElement = document.querySelector('.count-container')

const todoApp = new TodoApp(todoListElement, todoCountElement, window.location.hash);

todoInputElement.addEventListener('keyup', (event) => {
	const {key, target:{value}} = event;
    if (key === "Enter") {
		todoApp.addTodo(value);
		event.target.value = '';
    }
})

todoListElement.addEventListener('dblclick', (event) => {
    // 입력된 값 수저하는 기능
})

window.addEventListener('hashchange', ()=>{
	todoApp.changeFilter(window.location.hash)
})

todoListElement.addEventListener('click',(event)=>{
	todoApp.toggleTodo(event.target.dataset?.id)
})