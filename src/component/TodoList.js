import TodoItem from "./TodoItem.js";

function TodoList({ target }) {
	this.setState = (updatedTodoItems) => {
		this.render(updatedTodoItems);
	};

	const html = `<li>
		<div class="view">
		  <input class="toggle" type="checkbox"/>
		  <label class="label">새로운 타이틀</label>
		  <button class="destroy"></button>
		</div>
		<input class="edit" value="새로운 타이틀" />
	  </li>`;

	this.render = (items) => {
		console.log("TodoList render");
		const template = items.map((item) => html);
		target.innerHTML = template.join("");
	};
}

export default TodoList;
