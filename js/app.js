import TodoApp from "./components/TodoApp.js";
const todoInputElement = document.querySelector('#new-todo-title')
const todoListElement = document.querySelector('#todo-list')
const todoCountElement = document.querySelector('.count-container')

const todoApp = new TodoApp(todoListElement, todoCountElement, window.location.hash);

todoInputElement.addEventListener('keyup', (event) => {
	const {key, target:{value}} = event;
	const trimValue = value.trim();
    if (key === "Enter" && trimValue) {
		todoApp.addTodo(trimValue);
		event.target.value = '';
    }
})

todoListElement.addEventListener('dblclick', (event) => {
    // 입력된 값 수저하는 기능
})

window.addEventListener('hashchange', ()=>{
	todoApp.changeFilter(window.location.hash)
})

todoListElement.addEventListener('click',({target:{dataset:{id, role}}})=>{
	switch (role){
		case 'toggle':
			todoApp.toggleTodo(id)
			return;
		case 'remove':
			todoApp.removeTodo(id);
			return;
	}
})