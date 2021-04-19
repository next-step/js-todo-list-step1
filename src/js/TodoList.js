function TodoList({ onCheck, onEditing, onEdit, onDelete }) {
  const $todoList = document.querySelector('.todo-list');

  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = (items) => {
    $todoList.innerHTML = '';
    items.map(todoItemTemplate).map((value) => {
      $todoList.append(value);
    });
  };

  $todoList.addEventListener('click', (e) => clickTodoList(e));
  $todoList.addEventListener('dblclick', (e) => dblclickTodoList(e));
  $todoList.addEventListener('keyup', (e) => keyupTodoList(e));

  const clickTodoList = (event) => {
    if (event.target.classList[0] === 'toggle')
      onCheck(event.target.getAttribute('id'));
    else if (event.target.classList[0] === 'destroy')
      onDelete(event.target.getAttribute('id'));
  };

  const dblclickTodoList = (event) => {
    if (event.target.classList[0] === 'label')
      onEditing(event.target.previousElementSibling.getAttribute('id'));
  };

  const keyupTodoList = (event) => {
    if (event.target.classList[0] != 'edit') return;
    if (event.key === 'Escape')
      onEditing(event.target.parentNode.getAttribute('id'));
    else if (event.key === 'Enter')
      onEdit(event.target.parentNode.getAttribute('id'), event.target.value);
  };

  const todoItemTemplate = (item) => {
    const makeDOM = (tag, attributes) => {
      const dom = document.createElement(tag);
      for (const key in attributes) {
        // for of 불가
        dom.setAttribute(key, attributes[key]);
      }
      return dom;
    };

    const li = makeDOM('li', {
      id: item.id,
      class: `${item.completed ? 'completed' : false} ${
        item.editing ? 'editing' : ''
      }`,
    });

    const div = makeDOM('div', {
      class: 'view',
    });

    const input = makeDOM(
      'input',
      item.completed
        ? {
            class: 'toggle',
            type: 'checkbox',
            id: item.id,
            checked: '',
          }
        : {
            class: 'toggle',
            type: 'checkbox',
            id: item.id,
            false: '',
          }
    );

    const label = makeDOM('label', {
      class: 'label',
    });
    // label.innerText = item.contents;
    label.append(document.createTextNode(item.contents));

    const button = makeDOM('button', {
      class: 'destroy',
      id: item.id,
    });

    const inputEdit = makeDOM('input', {
      class: 'edit',
      value: item.contents,
    });

    li.append(div, inputEdit);
    div.append(input, label, button);

    return li;
  };
}

export default TodoList;
