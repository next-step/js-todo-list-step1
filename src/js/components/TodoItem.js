export default class TodoItem {
  constructor({ todoListUl, data, todoData, onCheckItem, onDeleteItem }) {
    this.todoListUl = todoListUl;
    this.data = data;
    this.todoData = todoData;
    this.handleCheckItem = onCheckItem;
    this.handleDeleteItem = onDeleteItem;

    this.title = document.createTextNode(this.data.title);
    this.item = document.createElement('li');
    if (this.data.completed) this.item.className = 'completed';
    this.view = document.createElement('div');
    this.view.className = 'view';

    this.completedCheck = document.createElement('input');
    this.completedCheck.type = 'checkbox';
    this.completedCheck.className = 'toggle';
    if (this.data.completed) this.completedCheck.checked = true;

    this.titleLabel = document.createElement('label');
    this.titleLabel.className = 'label';

    this.deleteButton = document.createElement('button');
    this.deleteButton.className = 'destroy';

    this.editInput = document.createElement('input');
    this.editInput.className = 'edit';
    this.editInput.value = this.data.title;

    this.titleLabel.appendChild(this.title);
    this.view.appendChild(this.completedCheck);
    this.view.appendChild(this.titleLabel);
    this.view.appendChild(this.deleteButton);
    this.item.appendChild(this.view);
    this.item.appendChild(this.editInput);
    this.todoListUl.appendChild(this.item);

    this.render();
  }

  render() {
    this.completedCheck.addEventListener('click', () => {
      this.item.classList.toggle('completed');
      this.handleCheckItem();
    });

    this.deleteButton.addEventListener('click', () => {
      this.item.remove();
      this.handleDeleteItem();
    });
  }
}
