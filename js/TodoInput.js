const $todoTitle = document.getElementById('new-todo-title');

$todoTitle.addEventListener("keyup", onAddTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    
    if(event.key === ENTER_KEY && todoTitle !== "") {
      // 중복항목 추가 불가능
      if(todos) {
        const exist = todos.filter(function(toDo) {
          return toDo.label == todoTitle;
        });
        if(exist.length > 0) {
          alert("이미 중복된 작업이 있습니다!");
          return;
        };
      } else {
        todos = [];
      }

      // create todo-item
      const div = document.createElement('div');
      const newId = $todoList.childNodes + 1;
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
      
      // add item to localStorage
      const todo = {
        id: newId,
        label: todoTitle,
        isCompleted: false
      };
      todos.push(todo);
      localStorage.setItem(TODO_LS,JSON.stringify(todos));

      event.target.value = "";
      updateCount();
    }
  }
