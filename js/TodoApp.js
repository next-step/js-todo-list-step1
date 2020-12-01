const $todoCount = document.querySelector('.todo-count strong');
const $todoList = document.getElementById('todo-list');
const filterOptions = document.querySelector('.filters');

filterOptions.addEventListener('click', filterTodos);

function updateCount() {
    const totalCount = $todoList.childElementCount;
    $todoCount.innerHTML = totalCount;
}

function filterTodos(event) {
    // selected style 적용
    /*
    var selected = document.getElementsByClassName('selected');
    selected[0].classList.remove('selected');
    event.target.classList.add('selected');
    */
    const todos = $todoList.childNodes;
    todos.forEach(function(todoEl) {
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

// 부모 컴포넌트
function TodoApp() {
    // 페이지 로드 시 초기 count 노출 (TODO : localStorage)
    updateCount();
}
new TodoApp();