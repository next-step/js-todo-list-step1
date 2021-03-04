function todoList() {
  const $input = document.querySelector("#new-todo-title");
  const $todoList = document.querySelector("#todo-list");
  const $todoCount = document.querySelector(".todo-count");
  const title = [];

  function addTodo(event) {
    if (event.target.value != "" && event.key === "Enter") {
      title.push(event.target.value);
      makeLI();
    }
  }

  function makeLI() {
    let htmlliElement = document.createElement("li");
    htmlliElement.innerHTML=" <div class=\"view\">\n" +
        "      <input class=\"toggle\" type=\"checkbox\"/>\n" +
        "      <label class=\"label\">새로운 타이틀</label>\n" +
        "      <button class=\"destroy\"></button>\n" +
        "    </div>\n" +
        "    <input class=\"edit\" value=\"새로운 타이틀\" />"
    $todoList.appendChild();
  }

  function countTodo() {
    let numTodo = $todoList.childElementCount;
    $todoCount.querySelector("strong").innerText = numTodo;
  }

  function deleteItem(event) {
    const target = event.target;
    if (target.classList.contains("destroy")) {
      $todoList.removeChild(newTodoItem);
      countTodo();
    }
  }

  $todoList.addEventListener("click", deleteItem);
  $input.addEventListener("keypress", addTodo);
}
const todoApp = new todoList();
