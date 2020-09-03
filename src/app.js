import { TodoInput } from './component/TodoInput.js';
import { TodoList } from './component/TodoList.js';
import { TodoCount } from './component/TodoCount.js';

class TodoApp {

    state;
    $todoInput;
    $todoList;
    $todoCount;

    constructor () {

        this.state = {
            todoItem: [],
            editingIndex: -1,
        };

        this.$todoInput = new TodoInput(
            // target
            document.getElementById('new-todo-title'),

            // props
            {
                onAdd: (contents, completed = false) => {
                    console.log(contents, completed);
                    this.setState({
                        todoItem: [
                            ...this.state.todoItem,
                            { completed, contents },
                        ],
                    });
                },
            },
        );

        this.$todoList = new TodoList(document.getElementById('todo-list'), {
            toggle: index => {
                const todoItem = [...this.state.todoItem];
                todoItem[index].completed = !todoItem[index].completed;
                this.setState({ todoItem });
            },
            remove: index => {
                const todoItem = [...this.state.todoItem];
                todoItem.splice(index, 1);
                this.setState({ todoItem });
            },
            editing: editingIndex => this.setState({ editingIndex }),
            cancel: () => this.setState({ editingIndex: -1 }),
            edited: (index, contents) => {
                const todoItem = [...this.state.todoItem];
                todoItem[index].contents = contents;
                this.setState({ todoItem, editingIndex: -1 });
            },
        });

        this.$todoCount = new TodoCount(
            document.querySelector('.count-container'),
        );

    }

    // todoItem state 변경
    setState (payload) {
        this.state = {
            ...this.state,
            ...payload,
        };
        this.$todoList.render(
            this.state.todoItem,
            this.state.editingIndex,
        );
        this.$todoCount.render(this.state.todoItem.length);
    }

};

new TodoApp();