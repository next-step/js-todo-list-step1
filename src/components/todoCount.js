import createStore from '../store/store.js';
import reducer from '../store/reducer.js';

const todoCount = () => {
	const $input = document.getElementById('new-todo-title');

	const store = createStore(reducer);
	const state = store.getState();


	function render() {
			
	}

    
};

export default todoCount;
