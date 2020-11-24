let id_No = localStorage.length;

window.onload = () => {
  //   localStorage.clear();
  todoList();
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
  let li = createli();
  li.innerHTML = param.value;
  todoList.append(li);
};

const todoList = () => {
  let tList = createLocalStorageArray();
  const todoList = document.querySelector("#todo-list");

  tList.forEach((value) => {
    let li = createli();
    li.innerHTML = value;
    todoList.append(li);
  });
};

const createLocalStorageArray = () => {
  let array = [];
  for (let index = 0; index < localStorage.length; index++) {
    array.push(localStorage.getItem(index));
  }
  return array;
};

const createli = () => {
  const li = document.createElement("li");
  li.classList.add("new-todo");
  return li;
};
