let id_No = 0;

window.onload = () => {
  localStorage.clear();
  saveTodos();
};

const setLocalStorage = (param) => {
  console.log(param);
  localStorage.setItem(param.id, param.value);
};

const saveTodos = () => {
  const todos = document.querySelector("#new-todo-title");

  let obj = {
    id: "",
    value: "",
  };

  todos.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
      console.log(todos.value);
      obj.id = id_No;
      obj.value = todos.value;
      addTodos(obj);
      setLocalStorage(obj);
      id_No++;
    }
  });
  //   console.log(text);
};

const addTodos = (param) => {
  //   let main = document.getElementsByTagName("main")[0];
  const todoList = document.querySelector("#todo-list");
  let li = document.createElement("li");
  li.classList.add("new-todo");
  li.innerHTML = param.value;
  todoList.append(li);
};
