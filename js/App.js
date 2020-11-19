import { getTodoList, setTodo } from "./components/TodoStorage.js";
import InputTodo from "./components/InputTodo.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";

function App() {
  let data = getTodoList();

  const todoApp = document.querySelector(".todoapp");
  const toDos = todoApp.querySelector("#todo-list");

  //complete & delete
  this.handleClick = e => {
    let newData = [...data];

    if (e.target.className === "toggle") {
      let id = e.target.parentNode.id;

      data.forEach(value => {
        if (value.id === id) {
          value.state = value.state === "completed" ? "" : "completed";
        }
      });
    }

    if (e.target.className === "destroy") {
      let div = e.target.parentNode;
      let id = div.id;

      data.forEach((value, index) => {
        if (value.id === id) {
          const li = div.parentNode;
          toDos.removeChild(li);
        }
      });

      const cleanTodo = data.filter(function(toDo) {
        return toDo.id !== id;
      });

      newData = cleanTodo;
    }
    this.setState(newData);
  };

  todoApp.addEventListener("click", this.handleClick);

  this.setState = newData => {
    data = newData;
    setTodo(data);
    this.TodoList.setState(data);
    this.TodoCount.setState(data);
    // new TodoCount(todoApp, data);
  };

  // add
  this.addTodo = todoObj => {
    const newData = [...data, todoObj];
    this.setState(newData);
  };

  this.init = () => {
    this.TodoList = new TodoList(data, toDos);
    this.TodoInput = new InputTodo(todoApp, this.addTodo);
    this.TodoCount = new TodoCount(todoApp, data);
  };

  this.init();
}
export default App;
