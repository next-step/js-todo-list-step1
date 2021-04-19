function TodoCount({ onFilter }) {
  const $todoCount = document.querySelector('.todo-count strong');
  const $todoFilter = document.querySelector('.filters');
  // 선택자 위임 이런거... 어떻게 해야 좋을까? 이렇게 하위로 하나씩 하는게 나은가?
  // 아니면 TodoList처럼?

  $todoFilter.addEventListener('click', (event) => this.clickTodoFilter(event));

  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems; // 이건 왜?
    this.render(this.todoItems);
  };

  this.render = (items) => {
    $todoCount.innerHTML = items.length;
  };

  this.clickTodoFilter = (event) => {
    onFilter(event.target.classList[0]);

    // toggle 내용. 근데 여기서 하는게 맞는지를 모르겠음.
    for (let elem of $todoFilter.children) {
      if (
        elem.firstElementChild.classList.contains('selected') ||
        elem.firstElementChild.classList.contains(event.target.classList[0])
      ) {
        elem.firstElementChild.classList.toggle('selected');
      }
    }
  };
}

export default TodoCount;
