import {Component} from "../core/Component/index.js";
import {store} from "../modules/index.js";
import {
    deleteTodo,
    toggleTodo,
    editTodoRequest,
    editTodoSuccess,
    editTodoCancel,
    getFilteredList
} from "../modules/todo/reducer.js";
import TodoItem from "./TodoItem.js";

export default class TodoList extends Component {

    fetchToggleTodo = (id) => {
        store.dispatch(toggleTodo(id));
    };

    fetchDeleteTodo = (id) => {
        store.dispatch(deleteTodo(id));
    };

    fetchEditTodoRequest = (id) => {
        store.dispatch(editTodoRequest(id));
    };

    fetchEditTodoSuccess = (id, content) => {
        store.dispatch(editTodoSuccess(id, content));
    };

    fetchEditTodoCancel = (id) => {
        store.dispatch(editTodoCancel(id));
    };

    setEvent(target) {
        target.addEventListener('click', ({target}) => {
            const action = target.dataset.action;
            const id = target.closest(`[data-id]`).dataset.id;
            switch (action) {
                case "toggle":
                    this.fetchToggleTodo(id);
                    break;
                case "delete":
                    this.fetchDeleteTodo(id);
                    break;
                default:
                    return;
            }
            event.stopImmediatePropagation();
        });

        target.addEventListener('dblclick', ({target}) => {
            const id = target.closest('[data-id]').dataset.id;
            this.fetchEditTodoRequest(id);
            event.stopImmediatePropagation();
        });

        target.addEventListener('keypress', ({key, target}) => {
            const id = target.closest('[data-id]').dataset.id;

            if (key === 'Enter') {
                this.fetchEditTodoSuccess(id, target.value);
            }
            if (key === 'Escape') {
                this.fetchEditTodoCancel(id);
            }
            event.stopImmediatePropagation();
        });

    }

    render() {
        const {todoList, filtered} = store.getState();
        const filteredList = getFilteredList(todoList, filtered);

        return filteredList ? filteredList.map(todo => TodoItem(todo)).join('') : '';
    }
};