const TODO_BUTTONS = Object.freeze({
  TOGGLE: 'toggle',
  LABEL: 'label',
  DESTROY: 'destroy',
  EDIT: 'edit',
  EDITING: 'editing',
  COMPLETED: 'completed',
  SELECTED: 'selected',
});

const FILTER_TYPES = Object.freeze({
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
});

const STORAGE_KEY = Object.freeze({
  TODO: 'todoList',
});

export { TODO_BUTTONS, FILTER_TYPES, STORAGE_KEY };
