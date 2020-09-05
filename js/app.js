import TodoApp from "./components/TodoApp.js";
const main = document.querySelector('main');
const todoInputElement = document.getElementById('new-todo-title')
const todoListElement = document.getElementById('todo-list')

const todoApp = new TodoApp(main, window.location.hash);

todoInputElement.addEventListener('keyup', (event) => {
	const {key, target:{value}} = event;
    if (key === "Enter") {
        let data = {
            id: ID++,
            context: value,// input value
            complete: false
        }
		dataPush(data);
    }
})


todoListElement.addEventListener('dblclick', (event) => {
    // 입력된 값 수저하는 기능
})

window.addEventListener('hashchange', ()=>{
	todoApp.changeFilter(window.location.hash)
})