
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
                    this.$todoList.render(this.state.todoItem);
                }
            }
        );

        this.$todoList = new TodoList(document.getElementById('todo-list'));
    }

    // todoItem state 변경
    setState (payload) {
        this.state = {
            ...this.state,
            ...payload,
        }
    }

};

new TodoApp();