import { generateId } from "../utils/generateId.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

export default function TodoApp({ $el }) {

    this.init = () => {
        this.$el = $el;
        this.todoItems = [];
        this.components = [];

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

        this.todoInput = new TodoInput({
            $el: this.$el.querySelector('#todo-input'),
            addTodoItem: this.addTodoItem,
        });
        this.todoList = new TodoList({
            $el: this.$el.querySelector('#todo-list'),
            todoItems: this.todoItems,
            toggleTodoItem: this.toggleTodoItem,
            removeTodoItem: this.removeTodoItem,
            updateTodoItem: this.updateTodoItem,
        });
        this.components.push(this.todoInput, this.todoList);

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
        this.components.forEach(component => {
            component.render();
        });
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
