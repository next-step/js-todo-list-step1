import { actionTypes } from '../utils/constants.js';
import todoInput from './todoInput.js';
import todoList from './todoList.js';
import todoFilter from './todoFilter.js';
import createStore from '../store/store.js';
import reducer from '../store/reducer.js';

const todoApp = () => {
	const store = createStore(reducer);

	function getTodoFromLocal() {
		if(localStorage.getItem('todoState') !== undefined) {
			const todoState = JSON.parse(localStorage.getItem('todoState'));
			store.dispatch({
				type: actionTypes.GET_STATE,
				state: todoState
		})
		}
  }

  getTodoFromLocal();
	todoInput();
	todoList();
	todoFilter();
	
};

export default todoApp;