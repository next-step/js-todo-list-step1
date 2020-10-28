const todoAppender = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");
const todoCount = document.getElementsByClassName("todo-count");

todoAppender.addEventListener("keydown", ({ key, target }) => {
	
	if(key !== "Enter" || target.value.trim().length === 0) return;
	const lastIndex = Math.max(0, ...[ ...todoList.querySelectorAll('[data-index]') ].map(v => v.dataset.index).map(Number)) + 1;
	todoList.insertAdjacentHTML('beforeend', `
		<li data-index="${lastIndex}">
			<div class="view">
				<input class="toggle" type="checkbox"/>
				<label class="label">${target.value}</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="${target.value}" />
		</li>
	`.trim());
	
	target.value = "";
})


todoList.addEventListener('click', ({ target }) => {
	if (!target.classList.contains('destroy')) return;
	const todoItem = target.closest('[data-index]');
	todoItem.remove();
})

todoList.addEventListener('change', ({ target }) => {
	if (!target.classList.contains('toggle')) return;
	const todoItem = target.closest('[data-index]');
	if (target.checked){
		return todoItem.setAttribute("class", "completed");
	}
	todoItem.removeAttribute("class");
})

todoList.addEventListener("dblclick", ({ target }) => {
	if (!target.classList.contains('label')) return;
	target.closest('li').setAttribute("class", "editing");

})
todoList.addEventListener("keyup", ({ key, target }) => {
	if (!target.classList.contains('edit')) return;
	const todoItem = target.closest('[data-index]');
	if (key === "Enter") {
		todoItem.querySelector('.label').innerHTML = target.value;
	}
	if (['Enter', 'Escape'].includes(key)){
		target.value = "";
		todoItem.classList.remove("editing");
	}
})