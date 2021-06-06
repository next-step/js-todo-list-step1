import { getItemId, $ } from "../utils/util.js";

export default function TodoList(app) {
	this.$todoList = $("#todo-list");
	this.todoItems = [];

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = items => {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join("");
  };

	const todoItemTemplate = (item) => {
    return `<li class=${item.status}>
    <div class="view">
      <input class="toggle" type="checkbox" ${item.status === "completed" ? "checked": ""}/>
      <label class="label">${item.text}</label>
      <button class="destroy"></button>
    </div>
    <input type="hidden" id="item-id" value="${item.id}"/>
    <input class="edit" value="${item.text}" />
  </li>`;
	};

	this.filterItems = status => {
		if (status === "all") {
			return this.render(app.todoItems);
		}
		this.todoItems = app.todoItems.filter(item => item.status === status);
		this.render(this.todoItems);
	}

	const onClick = ({ target }) => {
		if (target.className === "destroy") {
			// 여기선 id만 추출해서 todoApp의 delete 함수 호출시 인자로 넘김
			const itemId = getItemId(target);
			app.delete(itemId);
    }
		else if (target.className === "toggle") {
			const itemId = getItemId(target);
			app.complete(itemId);
		}
	}

	// 더블클릭시 TodoItem 을 수정할 수 있게 input 태그로 바뀌고, status가 editing 으로 변경
	const onDblClick = ({ target }) => {
		const itemId = getItemId(target);
		app.changeStatus(itemId);
	}

	const onKeydown = ({ target, key }) => {
		const itemId = getItemId(target);
		if (key === "Enter") {
			app.editItem(itemId, target.value);
		}
		else if (key === "Escape") {
			app.changeStatus(itemId);
		}
	}

	this.$todoList.addEventListener("click", onClick);
	this.$todoList.addEventListener("dblclick", onDblClick);
	this.$todoList.addEventListener("keydown", onKeydown);
}
