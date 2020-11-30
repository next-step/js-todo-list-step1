const $todoCount = document.querySelector('.todo-count strong');
const $todoList = document.getElementById('todo-list');

function updateCount() {
    const totalCount = $todoList.childElementCount;
    $todoCount.innerHTML = totalCount;
}

function TodoApp() {
    // 페이지 로드 시 초기 count 노출 (TODO : localStorage)
    updateCount();
}
new TodoApp();
