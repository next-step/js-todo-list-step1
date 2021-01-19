export const TodoList = ({ title, isCompleted, editing, id }) => {
  const li = document.createElement('li');
  const view = document.createElement('div');
  const toggle = document.createElement('input');
  const label = document.createElement('label');
  const destroy = document.createElement('button');
  const edit = document.createElement('input');

  view.classList.add('view');
  toggle.classList.add('toggle');
  label.classList.add('label');
  destroy.classList.add('destroy');
  edit.classList.add('edit');
  toggle.setAttribute('type', 'checkbox');
  label.innerText = title;
  edit.setAttribute('value', title);
  li.setAttribute('id', id);
  if (isCompleted) {
    li.classList.add('completed');
    toggle.setAttribute('checked', true);
  }
  if (editing) {
    li.classList.add('editing');
  }
  view.append(toggle, label, destroy);
  li.append(view, edit);
  return li;
};
