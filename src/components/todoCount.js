const todoCount = (showItems = 0) => {
	const $spanCount = document.querySelector('.todo-count');
	const count = Object.keys(showItems).length;

	function render() {
		$spanCount.innerHTML = `총 <strong>${count}</strong> 개`;
	}

	render();
};

export default todoCount;
