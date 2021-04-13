const todoInput = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");
const todoCount = document.querySelector(".todo-count");
const countingNum = todoCount.querySelector("strong");

const completeBtn = document.querySelector(".completed");
const pendingBtn = document.querySelector(".active");

const todoItemList = [];
const stateList = {};

let countItems = 0;

const addItem = (event) => {
	if (!event.isComposing && event.key === "Enter") {
		const inputText = todoInput.value;
		if (inputText !== "") {
			countItems++;
			countingNum.textContent = countItems;

			const id = Date.now();

			const list = document.createElement("li");
			const view = document.createElement("div");
			const checkBox = document.createElement("input");
			const label = document.createElement("label");
			const finBtn = document.createElement("button");
			const edit = document.createElement("input");

			todoList.appendChild(list);
			list.appendChild(view);
			list.appendChild(edit);
			view.appendChild(checkBox);
			view.appendChild(label);
			view.appendChild(finBtn);

			list.className = "false";
			list.id = id;
			view.className = "view";
			edit.className = "edit";
			checkBox.className = "toggle";
			checkBox.id = id;
			checkBox.type = "checkbox";
			label.className = "label";
			finBtn.className = "destroy";
			finBtn.id = id;

			label.textContent = inputText;
			edit.setAttribute("value", inputText);

			checkBox.addEventListener("click", checkFin);
			finBtn.addEventListener("click", removeItem);
			label.addEventListener("dblclick", editItem);
			edit.addEventListener("keydown", finEdit);

			todoInput.value = "";

			const item = document.querySelector(`[id="${id}"]`);
			todoItemList.push(item);
			stateList[id] = "Pending";

			function checkFin(event) {
				if (list.className === "false") {
					list.className = "completed";
					checkBox.setAttribute("checked", true);
				} else {
					list.className = "false";
					checkBox.setAttribute("checked", false);
				}
				setState();
				console.log(stateList);
			}

			function removeItem(event) {
				todoList.removeChild(list);
				countItems--;
				countingNum.textContent = countItems;
				const idx = todoItemList.indexOf(list);
				todoItemList.splice(idx, 1);
				delete stateList[list.id];
			}

			function editItem(event) {
				list.classList.add("editing");
			}

			function finEdit(event) {
				const editText = edit.value;
				if (event.key === "Escape") {
					list.classList.remove("editing");
					edit.setAttribute("value", editText);
				}
				if (!event.isComposing && event.key === "Enter") {
					list.classList.remove("editing");
					label.textContent = editText;
				}
			}

			function setState() {
				console.log(todoItemList);
				if (todoItemList) {
					todoItemList.map((item) => {
						if (item.className === "false") {
							stateList[item.id] = "Pending";
						} else {
							stateList[item.id] = "Completed";
						}
					});
				}
			}
		}
	}
};

const setComplete = () => {
	todoList.innerHTML = "";
	todoItemList.forEach((item) => {
		if (stateList[item.id] === "Completed") {
			todoList.appendChild(item);
		}
	});
};

const setPending = () => {
	todoList.innerHTML = "";
	todoItemList.forEach((item) => {
		if (stateList[item.id] === "Pending") {
			todoList.appendChild(item);
		}
	});
};

todoInput.addEventListener("keydown", addItem);
completeBtn.addEventListener("click", setComplete);
pendingBtn.addEventListener("click", setPending);
