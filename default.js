// 기존 작업한것 참고용

let index = 0;

const newTodoElem = document.querySelector("#new-todo-title");

const todoListElem = document.querySelector("#todo-list");

newTodoElem.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const title = newTodoElem.value;

    const todoId = `todo-item-${index++}`;

    const liElem = document.createElement("li");

    liElem.innerHTML = `

       <div class="view">

          <input class="toggle" type="checkbox"/>

          <label class="label">${title}</label>

          <button class="destroy"></button>

        </div>

        <input class="edit" value="${title}" />

    `;

    todoListElem.appendChild(liElem);

    newTodoElem.value = "";

    const todoItemToggle = liElem.querySelector(".toggle");

    todoItemToggle.addEventListener("change", (event) => {
      if (todoItemToggle.checked) {
        liElem.classList.add("completed");

        todoItemToggle.setAttribute("checked", "");
      } else {
        liElem.classList.remove("completed");

        todoItemToggle.removeAttribute("checked");
      }
    });

    const todoItemDestroy = liElem.querySelector(".destroy");

    todoItemDestroy.addEventListener("click", (event) => {
      todoListElem.removeChild(liElem);
    });

    liElem.addEventListener("dblclick", (event) => {
      liElem.classList.add("editing");
    });

    //change 이벤트를 걸어서 key가 'esc', 'enter'일때

    const editInputElem = liElem.querySelector(".edit");

    const titleLabelElem = liElem.querySelector(".label");

    editInputElem.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        liElem.classList.remove("editing");

        editInputElem.value = title;
      }

      if (event.key === "Enter") {
        liElem.classList.remove("editing");

        titleLabelElem.innerText = editInputElem.value;
      }
    });
  }
});
