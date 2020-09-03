
import { TodoInput } from "./component/TodoInput.js";
import {TodoList} from "./component/TodoList.js";

class TodoApp {

    state; $todoInput; $todoList;

    constructor () {

        this.state = {
            todoItem: [],
        }

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
                            { completed, contents }
                        ]
                    });
                }
            }
        );

        this.$todoList = new TodoList(document.getElementById('todo-list'), {
            toggle: (index) => {
                const todoItem = [ ...this.state.todoItem ];
                todoItem[index].completed = !todoItem[index].completed;
                this.setState({ todoItem });
            }
        });
    }

    // todoItem state 변경
    setState (payload) {
        this.state = {
            ...this.state,
            ...payload,
        }
        this.$todoList.render(this.state.todoItem);
    }

};

new TodoApp();