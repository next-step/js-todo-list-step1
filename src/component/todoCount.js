export default function TodoCount(todoList) {
	this.$todoCount = document.querySelector(".count-container");

	this.count = todoItems => {
		this.$todoCount.querySelector("strong").innerHTML = todoItems.length;
	}
	
	const onClick = event => {
		if (event.target.className === "active") {
			todoList.filterItems("view");
    }
		else if (event.target.className === "completed") {
			todoList.filterItems("completed");
		}
		else if (event.target.className === "all selected") {
			todoList.filterItems("all");
		}
	}

	this.$todoCount.addEventListener("click", onClick);
}
