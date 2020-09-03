import { TodoInput } from './component/TodoInput.js';
import { TodoList } from './component/TodoList.js';
import { TodoCount } from './component/TodoCount.js';
import { TodoFilter, filterTypes } from "./component/TodoFilter.js";

class TodoApp {

  state = {};
  $todoInput;
  $todoList;
  $todoCount;
  $todoFilter;

  constructor () {

    const $inputTarget = document.getElementById('new-todo-title');
    const $listTarget = document.getElementById('todo-list');
    const $countTarget = document.querySelector('.count-container .todo-count');
    const $filterTarget = document.querySelector('.count-container .filters');

    this.$todoInput = new TodoInput($inputTarget, {
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

    this.$todoList = new TodoList($listTarget, {
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

    this.$todoCount = new TodoCount($countTarget);

    this.$todoFilter = new TodoFilter($filterTarget, {
      selectFilter: filterType => this.setState({ filterType }),
    });

    this.setState({
      todoItem: [],
      editingIndex: -1,
      filterType: filterTypes[0].type,
    });

  }

  // todoItem state 변경
  setState (payload) {
    this.state = {
      ...this.state,
      ...payload,
    };
    const { todoItem, editingIndex, filterType } = this.state;
    this.$todoList.render(todoItem, editingIndex, filterType);
    this.$todoCount.render(todoItem.length);
    this.$todoFilter.render(filterType);
  }

};

new TodoApp();