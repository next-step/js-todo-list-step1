export default function TodoCount(todoList) {
	this.$todoCount = document.querySelector(".count-container");

	this.count = todoItems => {
		this.$todoCount.querySelector("strong").innerHTML = todoItems.length;
	}
	
	const onClick = event => {
		const statusList = {
			'all selected' : 'all',
			'active' : 'view',
			'completed' : 'completed',
		}
		
		todoList.filterItems(statusList[event.target.className]);
	}

	this.$todoCount.addEventListener("click", onClick);
}
