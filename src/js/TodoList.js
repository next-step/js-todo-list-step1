function TodoList({ onCheck, onEdit }) {
  const $todoList = document.querySelector('.todo-list');

  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = (items) => {
    // const template = items.map(todoItemTemplate);
    // $todoList.innerHTML = template.join('');
    $todoList.innerHTML = '';
    items.map(todoItemTemplate).map((value) => {
      $todoList.append(value);
    });
  };

  $todoList.addEventListener('click', (event) => this.checkTodoList(event));
  $todoList.addEventListener('dblclick', (event) => this.editTodoList(event));

  this.checkTodoList = (event) => {
    if (event.target.classList[0] === 'toggle') {
      onCheck(event.target.getAttribute('id'));
    }
  };

  this.editTodoList = (event) => {
    if (event.target.classList[0] == 'label') {
      onEdit(event.target.previousElementSibling.getAttribute('id'));
    }
  };

  const makeDOM = (tag, attributes) => {
    const dom = document.createElement(tag);
    for (const key in attributes) {
      dom.setAttribute(key, attributes[key]);
    }
    return dom;
  };

  const todoItemTemplate = (item) => {
    // return `
    // <li id=${item.id} class=
    // ${item.completed ? 'completed' : 'false'} checked=''
    // >
    //   <div class="view">
    //       <input class="toggle" type="checkbox" id=${item.id} ${
    //   item.completed ? 'checked' : false
    // }>
    //       <label class="label">${item.contents}</label>
    //       <button class="destroy" id=${item.id}></button>
    //   </div>
    //   <input class="edit" value=${item.contents}>
    // </li>
    // `;

    const li = makeDOM('li', {
      id: item.id, // number인데 괜찮나?
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
      // {
      //   class: 'toggle',
      //   type: 'checkbox',
      //   id: item.id,
      //   (item.completed ? checked : false): '',
      // }
    );

    const label = makeDOM('label', {
      class: 'label',
    });
    label.innerText = item.contents; // 맞나?

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
