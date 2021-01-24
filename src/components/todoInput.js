import { actionTypes } from '../utils/constants.js';
import reducer from '../store/reducer.js';
import createStore from '../store/store.js';
import todoList from './todoList.js';


const todoInput = () => {
	const $input = document.getElementById('new-todo-title');
	const store = createStore(reducer);

		$input.addEventListener('keypress', e => {
			if(e.key === 'Enter' && e.target.value.length > 0) {
				store.dispatch({
						type: actionTypes.ADD,
						content: $input.value
				})

				todoList();

				$input.value = '';
			}
	});
    
};

export default todoInput;
