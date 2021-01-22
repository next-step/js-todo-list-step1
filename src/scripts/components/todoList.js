import TodoItem from './todoItem.js';

class TodoList {
  constructor() {
    this.$todoList = document.querySelector('#todo-list');
  }

  init() {
    this.addEventCheckToggle();
    this.addEventDeleteTodoItem();
    this.addEventEditTodoItem();
  }

  addNewTodoItem(taskTitle) {
    this.$todoList.innerHTML += new TodoItem(taskTitle).render();
  }

  addEventCheckToggle() {
    this.$todoList.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        const closestLi = e.target.closest('li');
        closestLi.classList.toggle('completed');
      }
    });
  }

  addEventDeleteTodoItem() {
    this.$todoList.addEventListener('click', (e) => {
      if (e.target.classList.contains('destroy')) {
        const closestLi = e.target.closest('li');
        closestLi.remove();
      }
    });
  }

  addEventEditTodoItem() {
    this.$todoList.addEventListener('dblclick', (e) => {
      const closestLi = e.target.closest('li');
      const inputEdit = closestLi.querySelector('input.edit');
      inputEdit.style.display = 'block';
      inputEdit.focus();
      // 캐럿 위치 끝으로 이동
      inputEdit.setSelectionRange(inputEdit.value.length, inputEdit.value.length);
      closestLi.querySelector('div.view').style.display = 'none';
    });

    this.$todoList.addEventListener('keyup', (e) => {
      const closestLi = e.target.closest('li');

      function switchBackToView() {
        closestLi.querySelector('div.view').style.display = 'block';
        closestLi.querySelector('input.edit').style.display = 'none';
      }

      if (e.target.classList.contains('edit')) {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
          switchBackToView();
          closestLi.querySelector('label').innerHTML = e.target.value;
        } else if (e.key === 'Escape') {
          switchBackToView();
          e.target.value = closestLi.querySelector('label').innerHTML;
        }
      }
    });
  }
}

const $todoList = new TodoList();
$todoList.init();

export default $todoList;
