import createStore from '../store/store.js';
import reducer from '../store/reducer.js';

const todoCount = () => {
	const $input = document.getElementById('new-todo-title');

	const store = createStore(reducer);
	const state = store.getState();

	const $spanCount = document.querySelector('.todo-count');
	const count = Object.keys(state).length;

	function render() {
		$spanCount.innerHTML = `총 <strong>${count}</strong> 개`;
	}

	render();
};

export default todoCount;
