import { KEYCODE_ENTER, KEYCODE_ESC } from './constants.js';

function TodoList(element, { deleteTodo, toggleTodo, toggleEditMode, editTodo }) {
  this.$ul = element;
  this.deleteTodo = deleteTodo;
  this.toggleTodo = toggleTodo;
  this.toggleEditMode = toggleEditMode;
  this.editTodo = editTodo;

  this.$ul.addEventListener('click', e => {
    const { className } = e.target;
    const { id } = e.target.closest('li');
    if (className === 'destroy') {
      this.deleteTodo(id);
    } else if (className === 'toggle') {
      this.toggleTodo(id);
    }
  });

  this.$ul.addEventListener('dblclick', e => {
    const { id } = e.target.closest('li');
    this.toggleEditMode(id);

    // for focus input & set cursor position
    const $list = document.getElementById(id);
    const [$editInput] = Array.from($list.getElementsByClassName('edit'));
    const size = $editInput.value.length;
    $editInput.focus();
    $editInput.setSelectionRange(size, size);
  });

  this.$ul.addEventListener('keyup', e => {
    const { id } = e.target.closest('li');
    if (e.keyCode === KEYCODE_ESC) {
      this.toggleEditMode(id);
    }
    const newValue = e.target.value;
    if (newValue === '') return null;
    if (e.keyCode === KEYCODE_ENTER) {
      this.editTodo(id, newValue);
    }
  });
}

export default TodoList;
