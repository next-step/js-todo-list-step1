import { getTodoList, setTodo } from "./controller/TodoStorage.js";
import InputTodo from "./controller/InputTodo.js";
import TodoList from "./controller/TodoList.js";
import TodoCount from "./controller/TodoCount.js";

function App() {
  let data = getTodoList();

  const todoApp = document.querySelector(".todoapp");
  const toDos = todoApp.querySelector("#todo-list");

  //complete / delete
  const handleClick = e => {
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
    setState(newData);
  };

  todoApp.addEventListener("click", handleClick);

  const setState = newData => {
    data = newData;
    setTodo(data);
    new TodoList(data, toDos);
    new TodoCount(todoApp, data);
  };

  // add
  const addTodo = todoObj => {
    const newData = [...data, todoObj];
    setState(newData);
  };

  const init = () => {
    new TodoList(data, toDos);
    new InputTodo(todoApp, addTodo);
    new TodoCount(todoApp, data);
  };

  init();
}
export default App;
