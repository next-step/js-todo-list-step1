const $todoCount = document.querySelector('.todo-count strong');
const $todoList = document.getElementById('todo-list');
const filterOptions = document.querySelector('.filters');

const TODO_LS = "todos";
let todos = JSON.parse(localStorage.getItem(TODO_LS));

filterOptions.addEventListener('click', filterTodos);

function updateCount() {
    const totalCount = todos.length;
    $todoCount.innerHTML = totalCount;
}

function filterTodos(event) {
    // selected style 적용
    /*
    var selected = document.getElementsByClassName('selected');
    selected[0].classList.remove('selected');
    event.target.classList.add('selected');
    */
    $todoList.childNodes.forEach(function(todoEl) {
      if (todoEl.nodeName === "LI") {
        switch (event.target.className) {
          case "all selected":
            todoEl.style.display = "flex";
            break;
          case "completed":
            if (todoEl.classList.contains("completed")) {
              todoEl.style.display = "flex";
            } else {
              todoEl.style.display = "none";
            }
            break;
          case "active":
            if (todoEl.classList.contains("completed")) {
              todoEl.style.display = "none";
            } else {
              todoEl.style.display = "flex";
            }
            break;
        }
      }
    });
    updateCount();
  }

// 중복함수 생략 방법? (TodoList)
function toggleItem(event) {
    //filterTodos(event);
    const target = event.target;
    const list = target.parentElement.parentElement;
    list.classList.toggle('completed');
    event.target.removeEventListener("dblclick", showEditor);
    target.classList.toggle('checked');
  }  
function removeTodoItem(event) {
    if (confirm("정말 삭제하시겠습니까?")){
      const target = event.target;
      const list = target.parentElement.parentElement;
      $todoList.removeChild(list);

      // remove item from localStorage    
      const cleanTodos = todos.filter(function(toDo) {
        return toDo.label !== list.textContent;
      });
      todos = cleanTodos;
      localStorage.setItem(TODO_LS,JSON.stringify(todos));

      updateCount();
    }else{
        return;
    }
}
function showEditor(event) {
    const div = event.target.parentElement;
    const list = div.parentElement;
    list.classList.add('editing');

    // editor 생성
    const todoInput = document.createElement('input');
    todoInput.className = "edit";
    todoInput.value = list.textContent;
    list.appendChild(todoInput);

    todoInput.addEventListener("keyup", closeEditor);
  }  
function closeEditor(event) {
    const target = event.target; // edit
    const list = target.parentElement; // editing

    if (event.key === ENTER_KEY) {
      list.querySelector('label').textContent = target.value;
      list.classList.remove('editing');
      list.removeChild(target);
    } else if (event.key == ESC_KEY) {
      list.classList.remove('editing');
      list.removeChild(target);
    }
  }

// 부모 컴포넌트
function TodoApp() {
    // 페이지 로드 시 초기 count 노출 (TODO : localStorage)
    const loadedToDos = localStorage.getItem(TODO_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            const div = document.createElement('div');
            div.className = "view";

            const list = document.createElement('li');
            const input = document.createElement('input');
            input.className = "toggle";
            input.type = "checkbox";
            input.addEventListener("click", toggleItem);

            const label = document.createElement('label');
            label.className = "label";
            label.innerText = toDo.label;
            label.addEventListener("dblclick", showEditor); // todo list를 더블클릭했을 때 input 모드로 변경

            const button = document.createElement('button');
            button.className = "destroy";
            button.addEventListener("click", removeTodoItem);

            div.appendChild(input);
            div.appendChild(label);
            div.appendChild(button);
            list.appendChild(div);
            $todoList.appendChild(list);
        });
    updateCount();
    }
}
new TodoApp();