window.onload = () => {
	const list = document.querySelector("#todo-list");
	const countBox = document.querySelector(".todo-count");
	const allTodoItems = [];
	let pushCheck = true;
	let count = 0;
	let selectedTodoItems = [];

	Object.prototype.siblings = function(select) {
		return this.filter(v => v != select);
	};
	Object.prototype.forEach = function(callback) {
		for(let i = 0; i < this.length; i++) {
			callback(this[i], i);
		}
	};

	function makeTodoItem(val) {
		const box = document.createElement("li");
		const view = document.createElement("div");
		const checkBox = document.createElement("input");
		const label = document.createElement("label");
		const destoryButton = document.createElement("button");
		const editInput = document.createElement("input");

		view.setAttribute("class", "view");
		checkBox.setAttribute("class", "toggle");
		checkBox.setAttribute("type", "checkbox");
		label.setAttribute("class", "label");
		destoryButton.setAttribute("class", "destroy");
		editInput.setAttribute("class", "edit");

		label.innerHTML = val;

		box.addEventListener("dblclick", function(e) {
			this.classList.add("editing");

			editInput.select();
		});
		checkBox.addEventListener("change", function(e) {
			if(this.checked) {
				box.classList.add("completed");
			}else {
				box.classList.remove("completed");
			};
		});
		destoryButton.addEventListener("click", function(e) {
			list.removeChild(this.parentNode.parentNode);

			allTodoItems.indexOf(this.parentNode.parentNode);

			let idx = allTodoItems.indexOf(this.parentNode.parentNode);
			allTodoItems.splice(idx, 1);

			count--;
			loadTodoItemCount();
		});
		editInput.addEventListener("keyup", function(e) {
			if(e.key === "Enter") label.innerHTML = this.value;
			if(e.key === "Enter" || e.key === "Escape") {
				this.value = "";

				box.classList.remove("editing");
			};
		});
		editInput.addEventListener("focusout", function(e) {
			this.value = "";

			box.classList.remove("editing");
		});

		count++;
		countBox.children[0].innerHTML = count;

		view.append(checkBox, label, destoryButton);
		box.append(view, editInput);

		allTodoItems.push(box);
		loadTodoList(allTodoItems);
	};

	const input = document.querySelector("#new-todo-title");
	input.addEventListener("keyup", function(e) {
		if(e.key === "Enter") {
			if(this.value == "") alert("공백은 추가할 수 없습니다");
			else {
				makeTodoItem(this.value);

				this.value = "";
			};
		};
	});

	const all = document.querySelector(".all.selected");
	all.onclick = () => filtersButtonSelect("all");

	const active = document.querySelector(".active");
	active.onclick = () => filtersButtonSelect("active");

	const completed = document.querySelector(".completed");
	completed.onclick = () => filtersButtonSelect("completed");

	(loadTodoList = function(arr) {
		list.innerHTML = "";

		arr.forEach(item => {
			list.append(item);
		});
	})(allTodoItems);

	(loadTodoItemCount = function() {
		countBox.children[0].innerHTML = count;
	})();

	function filtersButtonSelect(kind) {
		const filters = [all, active, completed];
		selectedTodoItems = [];

		switch(kind) {
			case "all" : {
				filters[0].classList.add("selected");
				filters.siblings(filters[0]).forEach(item => {
					item.classList.remove("selected");
				});

				selectedTodoItems = allTodoItems;
				loadTodoList(selectedTodoItems);

				countBox.children[0].innerHTML = count;

				break;
			};
			case "active" : {
				let activeCount = 0;

				filters[1].classList.add("selected");
				filters.siblings(filters[1]).forEach(item => {
					item.classList.remove("selected");
				});

				allTodoItems.forEach(item => {
					if(!item.children[0].children[0].checked)
						selectedTodoItems.push(item);
				});

				activeCount = selectedTodoItems.length;
				loadTodoList(selectedTodoItems);

				countBox.children[0].innerHTML = activeCount;

				break;
			};
			case "completed" : {
				let completedCount = 0;

				filters[2].classList.add("selected");
				filters.siblings(filters[2]).forEach(item => {
					item.classList.remove("selected");
				});

				allTodoItems.forEach(item => {
					if(item.children[0].children[0].checked)
						selectedTodoItems.push(item);
				});

				completedCount = selectedTodoItems.length;
				loadTodoList(selectedTodoItems);

				countBox.children[0].innerHTML = completedCount;

				break;
			};
		};
	};
};