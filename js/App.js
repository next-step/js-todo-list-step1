import { getTodoList, setTodo } from "./controller/TodoStorage.js";
import InputTodo from "./controller/InputTodo.js";

function App() {
  console.log("App.js");

  const todoApp = document.querySelector(".todoapp");
  const ul = todoApp.querySelector(".todo-list");
  const data = getTodoList();

  const render = function(toDos) {
    toDos.forEach(function(todo) {
      const list = document.createElement("li");
      list.innerHTML = `
      <li>
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="label"></label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="" />
      </li>`;

      let li = list.querySelector(".label");
      li.innerText = todo.text;
      ul.appendChild(list);
    });
  };

  //add
  const addTodo = todo => {
    data.push(todo);
    setTodo(data);
    load();
  };

  //load
  const load = () => {
    if (data.length !== 0) {
      render(data);
    }
  };

  //input
  new InputTodo(todoApp, addTodo);
  load();
}
export default App;
