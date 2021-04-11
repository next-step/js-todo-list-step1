function TodoList({ target, onDeleteButton, onCompleted }) {
	this.setState = (updatedTodoItems) => {
		this.render(updatedTodoItems);
	};

	const template = (tagName, props) => {
		const dom = document.createElement(tagName);
		for (let key in props) {
			if (key.startsWith("on")) {
				dom.addEventListener(key.substring(2).toLowerCase(), props[key]);
			} else {
				dom.setAttribute(key, props[key]);
			}
		}

		return dom;
	};

	const html = (itemModel) => {
		const li = template("li", { class: itemModel.completed ? "completed" : "" });

		const div = template("div", { class: "view" });

		const input = template(
			"input",
			itemModel.completed
				? {
						class: "toggle",
						type: "checkbox",
						checked: true,
						onChange: onCompleted.bind(null, itemModel.id)
				  }
				: {
						class: "toggle",
						type: "checkbox",
						onChange: onCompleted.bind(null, itemModel.id)
				  }
		);

		const label = template("label", { class: "label" });
		label.append(document.createTextNode(itemModel.contents));

		const button = template("button", { class: "destroy", onClick: onDeleteButton.bind(null, itemModel.id) });

		const edit = template("input", { class: "edit", value: "새로운 타이틀" });

		div.append(input, label, button);
		li.append(div, edit);
		return li;
	};

	this.render = (items) => {
		console.log("TodoList render");

		target.innerHTML = "";

		items.reduce((acc, cur) => {
			acc.append(html(cur));
			return acc;
		}, target);
	};
}

export default TodoList;
