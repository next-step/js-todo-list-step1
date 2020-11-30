const $todoTitle = document.getElementById('new-todo-title');
$todoTitle.addEventListener("keyup", onAddTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    if(event.key === ENTER_KEY && todoTitle !== "") {
      const div = document.createElement('div');
      div.className = "view";
  
      const list = document.createElement('li');
      const input = document.createElement('input');
      input.className = "toggle";
      input.type = "checkbox";
      input.addEventListener("click", toggleItem);
  
      const label = document.createElement('label');
      label.className = "label";
      label.innerText = todoTitle;
      label.addEventListener("dblclick", showEditor); // todo list를 더블클릭했을 때 input 모드로 변경
      
      const button = document.createElement('button');
      button.className = "destroy";
      button.addEventListener("click", removeTodoItem);
  
      div.appendChild(input);
      div.appendChild(label);
      div.appendChild(button);
      list.appendChild(div);
      $todoList.appendChild(list);
  
      event.target.value = "";
      updateCount();
    }
  }
  