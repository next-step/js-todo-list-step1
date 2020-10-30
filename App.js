import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import TodoStatus from "./components/TodoStatus.js";
import { STATUS } from "./utils/constantsKey.js";
import { getStorageData, setStorageData } from "./utils/handleData.js";

function App() {
  if (!new.target) throw new Error("error: App must be called with new!");

  const handleData = {
    onAdd: (inputVal) => {
      const originTodos = this.todos;
      const newTodos = [
        ...originTodos,
        { idx: Date.now(), content: inputVal, isCompleted: false },
      ];
      this.setState(newTodos);
    },
    onToggle: (idx) => {
      const originTodos = this.todos;
      const newTodos = originTodos.map((todo) => {
        if (todo.idx === parseInt(idx, 10)) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });

      this.setState(newTodos);
    },
    onRemove: (idx) => {
      const originTodos = this.todos;
      const newTodos = originTodos.filter(
        (todo) => todo.idx !== parseInt(idx, 10)
      );
      this.setState(newTodos);
    },
    onChange: ({ idx, content }) => {
      const originTodos = this.todos;
      const newTodos = originTodos.map((todo) => {
        if (todo.idx === parseInt(idx, 10)) {
          return {
            ...todo,
            content: content,
          };
        }
        return todo;
      });
      this.setState(newTodos);
    },
    onBindStatus: (status) => {
      this.setState(this.todos, { status: status });
    },
    onSetStatus: (status) => {
      const todosBy = {
        [STATUS.ACTIVE]: this.todos.filter((todo) => !todo.isCompleted),
        [STATUS.COMPLETED]: this.todos.filter((todo) => todo.isCompleted),
      };
      return todosBy[status] || this.todos;
    },
  };

  this.setState = (newData, { status = this.status || "all" } = "") => {
    setStorageData(newData);
    this.todos = getStorageData();
    this.status = status;
    this.fileteredTodos = handleData.onSetStatus(this.status);

    this.render(this.fileteredTodos);
  };

  this.render = (todos) => {
    this.todoList.setState(todos);
    this.todoCount.setState(todos);
  };

  this.init = () => {
    this.todos = getStorageData();

    try {
      this.todoInput = new TodoInput({ onAction: { add: handleData.onAdd } });
      this.todoList = new TodoList(this.todos, {
        onAction: {
          toggle: handleData.onToggle,
          remove: handleData.onRemove,
          change: handleData.onChange,
        },
      });
      this.todoCount = new TodoCount(this.todos);
      this.todoStatus = new TodoStatus({
        onAction: { bind: handleData.onBindStatus },
      });
    } catch (e) {
      console.log(error);
    }
  };

  this.init();
}

new App();
