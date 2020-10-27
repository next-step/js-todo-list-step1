window.onload = () => {
	// const allTodoItems = [];
	// let pushCheck = true;
	// let selectedTodoItems = [];

	// Object.prototype.siblings = function(select) {
	// 	return this.filter(v => v != select);
	// };

	// const all = document.querySelector(".all.selected");
	// all.onclick = () => filtersButtonSelect("all");

	// const active = document.querySelector(".active");
	// active.onclick = () => filtersButtonSelect("active");

	// const completed = document.querySelector(".completed");
	// completed.onclick = () => filtersButtonSelect("completed");

	// (loadTodoList = function(arr) {
	// 	list.innerHTML = "";

	// 	arr.forEach(item => {
	// 		list.append(item);
	// 	});
	// })(allTodoItems);

	// (loadTodoItemCount = function() {
	// 	countBox.children[0].innerHTML = count;
	// })();

	// function filtersButtonSelect(kind) {
	// 	const filters = [all, active, completed];
	// 	selectedTodoItems = [];

	// 	switch(kind) {
	// 		case "all" : {
	// 			filters[0].classList.add("selected");
	// 			filters.siblings(filters[0]).forEach(item => {
	// 				item.classList.remove("selected");
	// 			});

	// 			selectedTodoItems = allTodoItems;
	// 			loadTodoList(selectedTodoItems);

	// 			countBox.children[0].innerHTML = count;

	// 			break;
	// 		};
	// 		case "active" : {
	// 			let activeCount = 0;

	// 			filters[1].classList.add("selected");
	// 			filters.siblings(filters[1]).forEach(item => {
	// 				item.classList.remove("selected");
	// 			});

	// 			allTodoItems.forEach(item => {
	// 				if(!item.children[0].children[0].checked)
	// 					selectedTodoItems.push(item);
	// 			});

	// 			activeCount = selectedTodoItems.length;
	// 			loadTodoList(selectedTodoItems);

	// 			countBox.children[0].innerHTML = activeCount;

	// 			break;
	// 		};
	// 		case "completed" : {
	// 			let completedCount = 0;

	// 			filters[2].classList.add("selected");
	// 			filters.siblings(filters[2]).forEach(item => {
	// 				item.classList.remove("selected");
	// 			});

	// 			allTodoItems.forEach(item => {
	// 				if(item.children[0].children[0].checked)
	// 					selectedTodoItems.push(item);
	// 			});

	// 			completedCount = selectedTodoItems.length;
	// 			loadTodoList(selectedTodoItems);

	// 			countBox.children[0].innerHTML = completedCount;

	// 			break;
	// 		};
	// 	};
	// };

	const app = new TodoApp();
	console.log(app.todoItems.nomal);
};