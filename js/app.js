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

window.addEventListener('hashchange', ()=>{
	todoApp.changeFilter(window.location.hash)
})

todoListElement.addEventListener('click',({target:{dataset:{id, role}}})=>{
	switch (role){
		case 'toggle':
			todoApp.toggleDone(id)
			return;
		case 'remove':
			todoApp.removeTodo(id);
			return;
	}
})

todoListElement.addEventListener('dblclick',({target:{dataset:{id, role}}})=>{
	if(role==='edit'){
		todoApp.toggleEdit(id);
	}
})

todoListElement.addEventListener('keyup',({key, target:{value, dataset:{id, role}}})=>{
	if(role==='change'){
		switch (key){
			case 'Escape':
				todoApp.toggleEdit(id);
				return;
			case 'Enter':
				todoApp.changeTodo(id, value);
				return;
		}
	}
})