import { TODO_FILTER_TYPE } from "../../consts/todoFilterType.js";
import { generateId } from "../utils/generateId.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

export default function TodoApp({ $parent }) {

    this.init = () => {
        this.$el = document.createElement('div');
        $parent.appendChild(this.$el);

        this.todoItems = [];
        this.components = {};

        this.render();
    };

    this.setState = ({todoItems}) => {
        this.todoItems = todoItems;
        this.render();
    };

    this.render = () => {

        const todoFilterType = computeTodoFilterType();
        const filterdTodoItems = this.todoItems.filter(todoItem => {
            if (todoFilterType === TODO_FILTER_TYPE.ACTIVE) {
                return !todoItem.checked;
            }
            if (todoFilterType === TODO_FILTER_TYPE.COMPLETED) {
                return todoItem.checked;
            }
            return true;
        });
        const todoCount = filterdTodoItems.length;

        this.$el.innerHTML = `
            <div class="todoapp">
                <h1>TODOS</h1>
                <div id="todo-input"></div>
                <main>
                    <input class="toggle-all" type="checkbox" />
                    <div id="todo-list"></div>
                    <div class="count-container">
                        <span class="todo-count">총 <strong>${todoCount}</strong> 개</span>
                        <ul class="filters">
                            <li>
                                <a class="all ${todoFilterType === TODO_FILTER_TYPE.ALL ? 'selected' : ''}" href="/#">전체보기</a>
                            </li>
                            <li>
                                <a class="active ${todoFilterType === TODO_FILTER_TYPE.ACTIVE ? 'selected' : ''}"" href="#active">해야할 일</a>
                            </li>
                            <li>
                                <a class="completed ${todoFilterType === TODO_FILTER_TYPE.COMPLETED ? 'selected' : ''}"" href="#completed">완료한 일</a>
                            </li>
                        </ul>
                    </div>
                </main>
            </div>
        `;

        this.$el.querySelector('.filters').addEventListener('click', event => {
            event.stopPropagation();

            if (event.target.tagName === 'A') {
                setTimeout(this.render, 0);
            }
        });

        this.components = {
            todoInput: new TodoInput({
                $parent: this.$el.querySelector('#todo-input'),

                addTodoItem: this.addTodoItem,
            }),

            todoList: new TodoList({
                $parent: this.$el.querySelector('#todo-list'),
                todoItems: filterdTodoItems,

                toggleTodoItem: this.toggleTodoItem,
                removeTodoItem: this.removeTodoItem,
                updateTodoItem: this.updateTodoItem,
            }) 
        };
    };

    this.addTodoItem = ({todoText}) => {
        this.todoItems.push({
            id: generateId(),
            text: todoText,
            checked: false,
        });

        this.setState({todoItems: this.todoItems});
    };

    this.toggleTodoItem = ({todoId}) => {
        const index = this.todoItems.findIndex(({id}) => id === todoId);
        this.todoItems[index].checked = !this.todoItems[index].checked;

        this.setState({todoItems: this.todoItems});
    };

    this.removeTodoItem = ({todoId}) => {
        const index = this.todoItems.findIndex(({id}) => id === todoId);
        this.todoItems.splice(index, 1);

        this.setState({todoItems: this.todoItems});
    };

    this.updateTodoItem = ({todoId, updatedText}) => {
        const index = this.todoItems.findIndex(({id}) => id === todoId);
        const beforeUpdateTodoItem = this.todoItems[index];

        this.todoItems.splice(index, 1, {
            ...beforeUpdateTodoItem,
            text: updatedText,
        });

        this.setState({todoItems: this.todoItems});
    };

    this.init();

    return this;
}

function computeTodoFilterType() {
    const hash = window.location.hash.slice(1);

    switch(hash) {
        case 'active':
            return TODO_FILTER_TYPE.ACTIVE;
        case 'completed':
            return TODO_FILTER_TYPE.COMPLETED;
        default:
            return TODO_FILTER_TYPE.ALL;
    }
}
