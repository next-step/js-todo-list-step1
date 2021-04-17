class TodoApp {
  constructor(todoItemArray) {
    this.todoItemArray = todoItemArray;

    const newTodoInput = document.getElementById("new-todo-title");
    newTodoInput.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        this.addItem(newTodoInput.value);
        newTodoInput.value = "";
      }
    });
  }
  lordData() {
    const localStoredArray = JSON.parse(
      "[" + localStorage.getItem("my-todo-list") + "]"
    );
    localStoredArray.forEach((item) => {
      this.todoItemArray.push(new TodoItem(item.data, item.state));
    });
    this.setState();
  }
  addItem(data) {
    if (!data || data.trim() == "") return;
    this.todoItemArray.push(new TodoItem(data, TodoItem.ACTIVE));
    this.setState();
  }
  deleteItem(index) {
    this.todoItemArray.splice(index, 1);
    this.setState();
  }
  updateItem(index, data) {
    this.todoItemArray[index].data = data;
    this.setState();
  }
  updateItemState(index, isCompleted) {
    if (isCompleted) {
      this.todoItemArray[index].state = TodoItem.COMPLETED;
    } else {
      this.todoItemArray[index].state = TodoItem.ACTIVE;
    }
    this.setState();
  }
  setState() {
    if (this.todoList) {
      this.todoList.setState(this.todoItemArray);
    }
    if (this.todoStatusContainer) {
      this.todoStatusContainer.setState();
    }
    localStorage.setItem("my-todo-list", this.todoItemArray);
  }
}

class TodoItem {
  static ACTIVE = "active";
  static COMPLETED = "completed";

  constructor(data, state) {
    if (state != TodoItem.ACTIVE && state != TodoItem.COMPLETED) {
      alert("item state error");
      return;
    }
    this.data = data;
    this.state = state;
  }
  toString() {
    return JSON.stringify(this);
  }
}

class TodoList {
  constructor(todoApp) {
    this.todoApp = todoApp;

    const list = document.getElementById("todo-list");
    list.addEventListener("click", function (e) {
      if (e.target && e.target.className == "toggle") {
        const targetLi = e.target.parentNode.parentNode;
        todoApp.updateItemState(
          targetLi.dataset.index,
          targetLi.classList.toggle(TodoItem.COMPLETED)
        );
        targetLi.classList.toggle(TodoItem.ACTIVE);
      }
    });
    list.addEventListener("click", function (e) {
      if (e.target && e.target.className == "destroy") {
        const targetLi = e.target.parentNode.parentNode;
        targetLi.outerHTML = "";
        todoApp.deleteItem(targetLi.dataset.index);
      }
    });
    list.addEventListener("dblclick", function (e) {
      if (e.target && e.target.nodeName == "LABEL") {
        const targetLi = e.target.parentNode.parentNode;
        targetLi.classList.add("editing");
      }
    });
    list.addEventListener("keydown", function (e) {
      if (e.target && e.target.nodeName == "INPUT") {
        if (e.key == "Escape") {
          const targetLi = e.target.parentNode;
          targetLi.classList.remove("editing");
        } else if (e.key == "Enter") {
          const targetLi = e.target.parentNode;
          todoApp.updateItem(targetLi.dataset.index, e.target.value);
          targetLi.classList.remove("editing");
        }
      }
    });
  }
  setState(todoItemArray) {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";
    let li;
    let index = 0;
    todoItemArray.forEach((item) => {
      li = document.createElement("li");

      const indexAttribute = document.createAttribute("data-index");
      indexAttribute.value = index;
      index = index + 1;
      li.setAttributeNode(indexAttribute);

      if (item.state == TodoItem.COMPLETED) {
        const liClass = document.createAttribute("class");
        liClass.value = TodoItem.COMPLETED;
        li.setAttributeNode(liClass);
      } else if (item.state == TodoItem.ACTIVE) {
        const liClass = document.createAttribute("class");
        liClass.value = TodoItem.ACTIVE;
        li.setAttributeNode(liClass);
      }
      li.innerHTML = `
            <div class="view">
                <input class="toggle" type="checkbox" ${
                  item.state == TodoItem.COMPLETED ? "checked" : ""
                }/>
                <label class="label">${item.data}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${item.data}" />
            `;
      list.appendChild(li);
    });
  }
}
class TodoStatusContainer {
  constructor() {
    const container = document.querySelector(".count-container");
    const activeFilter = container.getElementsByClassName(TodoItem.ACTIVE)[0];
    const completedFilter = container.getElementsByClassName(
      TodoItem.COMPLETED
    )[0];
    const allFilter = container.getElementsByClassName("all")[0];
    activeFilter.addEventListener("click", (e) => {
      e.preventDefault();
      activeFilter.classList.add("selected");
      completedFilter.classList.remove("selected");
      allFilter.classList.remove("selected");

      const list = document.getElementById("todo-list");
      list.querySelectorAll("li").forEach((li) => {
        if (!li.classList.contains(TodoItem.ACTIVE)) li.style.display = "none";
        else li.style.display = "";
      });
      this.setState();
    });
    completedFilter.addEventListener("click", (e) => {
      e.preventDefault();
      activeFilter.classList.remove("selected");
      completedFilter.classList.add("selected");
      allFilter.classList.remove("selected");

      const list = document.getElementById("todo-list");
      list.querySelectorAll("li").forEach((li) => {
        if (!li.classList.contains(TodoItem.COMPLETED))
          li.style.display = "none";
        else li.style.display = "";
      });
      this.setState();
    });
    allFilter.addEventListener("click", (e) => {
      e.preventDefault();
      activeFilter.classList.remove("selected");
      completedFilter.classList.remove("selected");
      allFilter.classList.add("selected");

      const list = document.getElementById("todo-list");
      list.querySelectorAll("li").forEach((li) => {
        li.style.display = "";
      });
      this.setState();
    });
  }
  setState() {
    const list = document.getElementById("todo-list");
    let count = 0;
    list.querySelectorAll("li").forEach((li) => {
      if (li.style.display != "none") count = count + 1;
    });
    document.querySelector(".todo-count strong").textContent = count;
  }
}

const todoApp = new TodoApp([]);
const todoList = new TodoList(todoApp);
const todoStatusContainer = new TodoStatusContainer();

todoApp.todoList = todoList;
todoApp.todoStatusContainer = todoStatusContainer;
todoApp.lordData();
