const list = document.querySelector("#todo-list");
const count_box = document.querySelector(".todo-count");
let push_check = true;
let count = 0;
let all_arr = [];
let select_arr = [];

Object.prototype.siblings = function(select) {
	return this.filter(v => v != select);
};
Object.prototype.forEach = function(callback) {
	for(let i = 0; i < this.length; i++) {
		callback(this[i], i);
	}
};

function make_todo(val) {
	let box = document.createElement("li");
	let view = document.createElement("div");
	let check_input = document.createElement("input");
	let label = document.createElement("label");
	let button = document.createElement("button");
	let edit_input = document.createElement("input");

	view.setAttribute("class", "view");
	check_input.setAttribute("class", "toggle");
	check_input.setAttribute("type", "checkbox");
	label.setAttribute("class", "label");
	button.setAttribute("class", "destroy");
	edit_input.setAttribute("class", "edit");
	
	label.innerHTML = val;

	box.addEventListener("dblclick", function(e) {
		this.classList.add("editing");

		edit_input.select();
	});
	check_input.addEventListener("change", function(e) {
		if(this.checked) {
			box.classList.add("completed");
		}else {
			box.classList.remove("completed");
		};
	});
	button.addEventListener("click", function(e) {
		list.removeChild(this.parentNode.parentNode);

		console.log(this.parentNode.parentNode);
		all_arr.indexOf(this.parentNode.parentNode);

		count--;
		count_load();
	});
	edit_input.addEventListener("keyup", function(e) {
		if(e.keyCode == 13) {
			label.innerHTML = this.value;

			this.value = "";

			box.classList.remove("editing");
		}else if(e.keyCode == 27) {
			this.value = "";

			box.classList.remove("editing");
		};
	});

	count++;
	count_box.children[0].innerHTML = count;

	view.append(check_input, label, button);
	box.append(view, edit_input);

	all_arr.push(box);
	list_load(all_arr);
};

const input = document.querySelector("#new-todo-title");
input.addEventListener("keyup", function(e) {
	if(e.keyCode == 13) {
		if(this.value == "") alert("공백은 추가할 수 없습니다");
		else {
			make_todo(this.value);

			this.value = "";
		};
	};
});

const all = document.querySelector(".all.selected");
all.onclick = () => {
	if(list.children.length == all_arr.length) push_check = false;
	else {
		push_check = true;

		select("all");
	};
};

const active = document.querySelector(".active");
active.onclick = () => {
	push_check = false;

	select("active");
};

const completed = document.querySelector(".completed");
completed.onclick = () => {
	push_check = false;

	select("completed");
};

(list_load = function(arr) {
	list.innerHTML = "";

	arr.forEach(item => {
		list.append(item);
		console.log(item);
		// item.forEach(node => {
		// 	if(typeof node !== "number") {
		// 	};
		// });
	});
})(all_arr);

(count_load = function() {
	count_box.children[0].innerHTML = count;
})();

function select(kind) {
	const filters = [all, active, completed];
	select_arr = [];

	switch(kind) {
		case "all" : {
			filters[0].classList.add("selected");
			filters.siblings(filters[0]).forEach(item => {
				item.classList.remove("selected");
			});

			select_arr = all_arr;
			list_load(select_arr);

			count_box.children[0].innerHTML = count;

			break;
		};
		case "active" : {
			let active_count = 0;

			filters[1].classList.add("selected");
			filters.siblings(filters[1]).forEach(item => {
				item.classList.remove("selected");
			});

			[...all_arr].forEach(item => {
				if(!item.children[0].children[0].checked)
					select_arr.push(item);
			});

			active_count = select_arr.length;
			list_load(select_arr);

			count_box.children[0].innerHTML = active_count;

			break;
		};
		case "completed" : {
			let completed_count = 0;

			filters[2].classList.add("selected");
			filters.siblings(filters[2]).forEach(item => {
				item.classList.remove("selected");
			});

			[...all_arr].forEach(item => {
				if(item.children[0].children[0].checked)
					select_arr.push(item);
			});

			active_count = select_arr.length;
			list_load(select_arr);

			count_box.children[0].innerHTML = completed_count;

			break;
		};
	};
}