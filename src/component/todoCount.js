export default function TodoCount(todoList) {
	this.$todoCount = document.querySelector(".count-container");

	this.count = todoItems => {
		this.$todoCount.querySelector("strong").innerHTML = todoItems.length;
	}
	
	const onClick = event => {
		
		const statusList = {
			'all' : 'all',
			'active' : 'view',
			'completed' : 'completed',
		}

		const $filterLi = event.target;

		if ($filterLi.nodeName === 'A') {
			document.querySelector('.selected').classList.remove('selected');

			if ($filterLi.classList.contains('all')) {
				this.filter = 'all';
			} else if ($filterLi.classList.contains('active')) {
				this.filter = 'active';
			} else if ($filterLi.classList.contains('completed')) {
				this.filter = 'completed';
			}
			$filterLi.classList.add('selected');
			todoList.filterItems(statusList[this.filter]);
		}		
	}

	this.$todoCount.addEventListener("click", onClick);
}
