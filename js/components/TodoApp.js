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
        this.components.forEach(component => {
            component.setState({todoItems});
        });
        this.render();
    };

    this.render = () => {

        this.$el.innerHTML = `
            <div class="todoapp">
                <h1>TODOS</h1>
                <div id="todo-input"></div>
                <main>
                    <input class="toggle-all" type="checkbox" />
                    <div id="todo-list"></div>
                    <div class="count-container">
                        <span class="todo-count">총 <strong>0</strong> 개</span>
                        <ul class="filters">
                        <li>
                            <a class="all selected" href="/#">전체보기</a>
                        </li>
                        <li>
                            <a class="active" href="#active">해야할 일</a>
                        </li>
                        <li>
                            <a class="completed" href="#completed">완료한 일</a>
                        </li>
                        </ul>
                    </div>
                </main>
            </div>
        `;

        this.components = {
            todoInput: new TodoInput({
                $parent: this.$el.querySelector('#todo-input'),
                addTodoItem: this.addTodoItem,
            }),

            todoList: new TodoList({
                $parent: this.$el.querySelector('#todo-list'),
                todoItems: this.todoItems,
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

        this.components['todoList'].setState({todoItems: this.todoItems});
    };

    this.toggleTodoItem = ({todoId}) => {
        const index = this.todoItems.findIndex(({id}) => id === todoId);
        this.todoItems[index].checked = !this.todoItems[index].checked;

        this.components['todoList'].setState({todoItems: this.todoItems});
    };

    this.removeTodoItem = ({todoId}) => {
        const index = this.todoItems.findIndex(({id}) => id === todoId);
        this.todoItems.splice(index, 1);

        this.components['todoList'].setState({todoItems: this.todoItems});
    };

    this.updateTodoItem = ({todoId, updatedText}) => {
        const index = this.todoItems.findIndex(({id}) => id === todoId);
        const beforeUpdateTodoItem = this.todoItems[index];

        this.todoItems.splice(index, 1, {
            ...beforeUpdateTodoItem,
            text: updatedText,
        });

        this.components['todoList'].setState({todoItems: this.todoItems});
    };

    this.init();

    return this;
}
