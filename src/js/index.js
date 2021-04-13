const TODOITEMS = "todoItems";

const todoInput = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");
const todoCount = document.querySelector(".todo-count");
const countingNum = todoCount.querySelector("strong");

const completeBtn = document.querySelector(".completed");
const pendingBtn = document.querySelector(".active");

const todoItemList = [];
let stateList = {};

let countItems = 0;

// 추가하는 리스트 구조
function buildElement(inputText) {
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

	const item = document.querySelector(`[id="${id}"]`);
	todoItemList.push(item);
	stateList[id] = "Pending";
	todoInput.value = "";
	saveData();
}

// 아이템 추가
const addItem = (event) => {
	if (!event.isComposing && event.key === "Enter") {
		const inputText = todoInput.value;
		if (inputText !== "") {
			buildElement(inputText);
		}
	}
};

// 체크 버튼
function checkFin(event) {
	const checkBox = event.target;
	const list = checkBox.closest("li");
	if (list.className === "false") {
		list.className = "completed";
		checkBox.setAttribute("checked", true);
	} else {
		list.className = "false";
		checkBox.setAttribute("checked", false);
	}
	setState();
}

// 아이템 제거
function removeItem(event) {
	const finBtn = event.target;
	const list = finBtn.closest("li");
	console.log(list);
	todoList.removeChild(list);
	countItems--;
	countingNum.textContent = countItems;
	const idx = todoItemList.indexOf(list);
	todoItemList.splice(idx, 1);
	delete stateList[list.id];
	saveData();
}

// 아이템 수정
function editItem(event) {
	const label = event.target;
	const list = label.closest("li");
	list.classList.add("editing");
}

// 수정 종료
function finEdit(event) {
	const edit = event.target;
	const label = edit.previousSibling.querySelector("label");
	const list = edit.closest("li");

	const editText = edit.value;
	if (event.key === "Escape") {
		list.classList.remove("editing");
		edit.setAttribute("value", editText);
		edit.value = label.textContent;
	}
	if (!event.isComposing && event.key === "Enter") {
		list.classList.remove("editing");
		label.textContent = editText;
	}
}

// State
function setState() {
	if (todoItemList) {
		todoItemList.map((item) => {
			if (item.className === "false") {
				stateList[item.id] = "Pending";
			} else {
				stateList[item.id] = "Completed";
			}
		});
	}
	saveData();
}

function setComplete(event) {
	todoList.innerHTML = "";
	todoItemList.forEach((item) => {
		if (stateList[item.id] === "Completed") {
			todoList.appendChild(item);
		}
	});
	const count = todoList.children.length;
	countItems = count;
	countingNum.textContent = countItems;
	saveData();
}

function setPending(event) {
	todoList.innerHTML = "";
	todoItemList.forEach((item) => {
		if (stateList[item.id] === "Pending") {
			todoList.appendChild(item);
		}
	});
	const count = todoList.children.length;
	countItems = count;
	countingNum.textContent = countItems;
	saveData();
}

// localStorage
function saveData() {
	const stringItems = todoItemList.map((item) => item.outerHTML);
	localStorage.setItem(TODOITEMS, JSON.stringify({ stringItems, stateList }));
}

function loadData() {
	const loadedItems = localStorage.getItem(TODOITEMS);
	if (loadedItems !== null) {
		const parsedItems = JSON.parse(loadedItems);
		parsedItems.stringItems.forEach((item) => {
			const htmlObj = new DOMParser().parseFromString(item, "text/html");
			const list = htmlObj.querySelector("li");
			todoList.appendChild(list);

			const checkBox = list.querySelector(".toggle");
			const finBtn = list.querySelector(".destroy");
			const label = list.querySelector(".label");
			const edit = list.querySelector(".edit");

			const id = list.id;

			checkBox.addEventListener("click", checkFin);
			finBtn.addEventListener("click", removeItem);
			label.addEventListener("dblclick", editItem);
			edit.addEventListener("keydown", finEdit);
			todoItemList.push(list);
		});
		stateList = parsedItems.stateList;
		console.log(stateList);
	}
}

function init() {
	loadData();

	todoInput.addEventListener("keydown", addItem);
	completeBtn.addEventListener("click", setComplete);
	pendingBtn.addEventListener("click", setPending);
}

init();
