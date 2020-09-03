
import { TodoInput } from "./component/TodoInput";

class TodoApp {

    state;

    constructor () {

        this.state = {
            todoItem: [],
        }

        // TODO: todo list에 todoItem을 키보드로 입력하여 추가하기
        new TodoInput(
          // target
          document.getElementById('new-todo-title'),

          // props
          {
                onAdd: (contents, completed = false) => {
                    this.setState({
                        todoItem: [
                          ...this.state.todoItem,
                            { completed, contents }
                        ]
                    });
                }
            }
        );
    }

    // todoItem state 변경
    setState (payload) {
        this.state = {
            ...this.state,
            ...payload,
        }
    }

};
