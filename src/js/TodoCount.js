function TodoCount({ onFilter }) {
  const $todoCount = document.querySelector('.todo-count strong');
  const $todoFilter = document.querySelector('.filters');
  // ❓ 선택자위임. 어떻게? 이렇게 하위로 하나씩 하는게 나은지, 아니면 TodoList처럼 하는게 나은지.

  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = (items) => {
    $todoCount.innerHTML = items.length;
  };

  $todoFilter.addEventListener('click', (event) => clickTodoFilter(event));

  const clickTodoFilter = (event) => {
    onFilter(event.target.classList[0]);

    for (const elem of $todoFilter.children) {
      // for in 불가
      if (
        elem.firstElementChild.classList.contains('selected') ||
        elem.firstElementChild.classList.contains(event.target.classList[0])
      ) {
        elem.firstElementChild.classList.toggle('selected');
      }
    }
    // toggle 내용. 근데 여기서 하는게 맞는지를 모르겠음.
    // 더 좋은 방법 있나? 함수를 선언해서 어떻게 한다던지...
  };
}

export default TodoCount;
