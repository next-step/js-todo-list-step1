window.onload = () => {
	const list = document.querySelector("#todo-list");
	const countBox = document.querySelector(".todo-count");
	let pushCheck = true;
	let count = 0;
	let allArr = [];
	let selectArr = [];

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

			allArr.indexOf(this.parentNode.parentNode);

			let idx = allArr.indexOf(this.parentNode.parentNode);
			allArr.splice(idx, 1);

			count--;
			loadTodoItemCount();
		});
		editInput.addEventListener("keyup", function(e) {
			if(e.key == "Enter") {
				label.innerHTML = this.value;

				this.value = "";

				box.classList.remove("editing");
			}else if(e.key == "Escape") {
				this.value = "";

				box.classList.remove("editing");
			};
		});

		count++;
		countBox.children[0].innerHTML = count;

		view.append(checkBox, label, destoryButton);
		box.append(view, editInput);

		allArr.push(box);
		loadTodoList(allArr);
	};

	const input = document.querySelector("#new-todo-title");
	input.addEventListener("keyup", function(e) {
		if(e.key == "Enter") {
			if(this.value == "") alert("공백은 추가할 수 없습니다");
			else {
				makeTodoItem(this.value);

				this.value = "";
			};
		};
	});

	const all = document.querySelector(".all.selected");
	all.onclick = () => {
		if(list.children.length == allArr.length) pushCheck = false;
		else {
			pushCheck = true;

			select("all");
		};
	};

	const active = document.querySelector(".active");
	active.onclick = () => {
		pushCheck = false;

		select("active");
	};

	const completed = document.querySelector(".completed");
	completed.onclick = () => {
		pushCheck = false;

		select("completed");
	};

	(loadTodoList = function(arr) {
		list.innerHTML = "";

		arr.forEach(item => {
			list.append(item);
		});
	})(allArr);

	(loadTodoItemCount = function() {
		countBox.children[0].innerHTML = count;
	})();

	function select(kind) {
		const filters = [all, active, completed];
		selectArr = [];

		switch(kind) {
			case "all" : {
				filters[0].classList.add("selected");
				filters.siblings(filters[0]).forEach(item => {
					item.classList.remove("selected");
				});

				selectArr = allArr;
				loadTodoList(selectArr);

				countBox.children[0].innerHTML = count;

				break;
			};
			case "active" : {
				let activeCount = 0;

				filters[1].classList.add("selected");
				filters.siblings(filters[1]).forEach(item => {
					item.classList.remove("selected");
				});

				[...allArr].forEach(item => {
					if(!item.children[0].children[0].checked)
						selectArr.push(item);
				});

				activeCount = selectArr.length;
				loadTodoList(selectArr);

				countBox.children[0].innerHTML = activeCount;

				break;
			};
			case "completed" : {
				let completedCount = 0;

				filters[2].classList.add("selected");
				filters.siblings(filters[2]).forEach(item => {
					item.classList.remove("selected");
				});

				[...allArr].forEach(item => {
					if(item.children[0].children[0].checked)
						selectArr.push(item);
				});

				completedCount = selectArr.length;
				loadTodoList(selectArr);

				countBox.children[0].innerHTML = completedCount;

				break;
			};
		};
	};
};