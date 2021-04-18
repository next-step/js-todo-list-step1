import { setStorage, getStorage as items } from './storage.js';
import TodoList from '../components/TodoList.js';

export const todoItems = [...items()];

export function alertState(state) {
  const alertState = {
    null: '할 일을 입력해주세요 😢'
  };

  alert(alertState[state]);
  return false;
}

function updatedTodos(todos = []) {
  const updatedItems = new TodoList();
  updatedItems.setState(todos);
  setStorage('items', todos);
}

const checkedTodo = (event) => {
  if (!event.target.matches('input[type="checkbox"]')) return;

  const targetTodo = event.target.closest('li');
  const targetIndex = todoItems
    .findIndex(item => item.id === parseInt(targetTodo.dataset.index));

  todoItems[targetIndex].done = !todoItems[targetIndex].done;

  (event.target.checked)
    ? targetTodo.classList.add('completed') 
    : targetTodo.classList.remove('completed');

  setStorage('items', todoItems);
}

const deleteTodo = (event) => {
  if (!event.target.matches('button')) return;

  const targetTodo = event.target.closest('li');
  const index = Number(targetTodo.dataset.index);
  const removeIndex = todoItems.findIndex(item => item.id === index);

  todoItems.splice(removeIndex, 1);
  updatedTodos(todoItems);
}

const editTodo = (event) => {
  if (!event.target.matches('label')) return;

  if (event.type === 'dblclick') {
    const targetTodo = event.target.closest('li');
    const inputEl = document.createElement('input');

    targetTodo.classList.toggle('editing');
    (targetTodo.classList.contains('editing')) 
      && targetTodo.appendChild(inputEl).classList.add('edit');

    inputEl.value = event.target.innerText;
    inputEl.addEventListener('keydown', saveChangeText(targetTodo, event.target));
  }
}

const saveChangeText = (targetTodo, todoLabel) => (event) => {
  const changeText = event.target.value;

  if (event.key === 'Escape' || event.key === 'Enter') {
    (event.key === 'Enter') && finishedEdit(targetTodo, todoLabel, changeText);
    targetTodo.classList.remove('editing');
    event.target.remove();
  }
}

const finishedEdit = (targetTodo, todoLabel, changeText) => {
  todoLabel.innerText = changeText;

  const changeItem = todoItems.find(item => item.id === parseInt(targetTodo.dataset.index));

  changeItem.text = changeText;
  todoItems.splice(parseInt(targetTodo.dataset.index) - 1, changeItem);
  updatedTodos(todoItems);
}

export const handleClickEvent = (event) => {
  const eventTarget = {
    input: checkedTodo(event),
    label: editTodo(event),
    button: deleteTodo(event)
  }

  return eventTarget[(event.target.tagName).toLowerCase()];
}

export const handleSelectedState = (state) => {
  const stateList = {
    all: todoItems,
    active: todoItems.filter(todo => !todo.done),
    completed: todoItems.filter(todo => todo.done)
  };

  return { 
    stateList: stateList[state], 
    count: stateList[state].length 
  };
}
