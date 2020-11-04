import { getTodoList, setTodo } from "./controller/TodoStorage.js";
import InputTodo from "./controller/InputTodo.js";
import TodoList from "./controller/TodoList.js";

function App() {
  let data = getTodoList();

  const todoApp = document.querySelector(".todoapp");
  const toDos = todoApp.querySelector("#todo-list");

  //complete
  const handleToggle = e => {
    const newData = [...data];

    if (e.target.className === "toggle") {
      let index = e.target.id;

      data.forEach(value => {
        if (value.id === index) {
          value.state = value.state === "completed" ? "" : "completed";
        }
      });
    }

    setState(newData);
  };

  todoApp.addEventListener("click", handleToggle);

  const setState = newData => {
    data = newData;
    setTodo(data);
    new TodoList(data, toDos);
  };

  // add
  const addTodo = todoObj => {
    const newData = [...data, todoObj];
    setState(newData);
  };

  const init = () => {
    new TodoList(data, toDos);
    new InputTodo(todoApp, addTodo);
  };

  init();
}
export default App;
