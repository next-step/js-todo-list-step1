export const SELECTOR = {
  TODO_APP: '#todo-app',
  TODO_INPUT: '#new-todo-title',
  TODO_LIST: '#todo-list',
  TODO_TAB: '.filters',
  TODO_COUNT: '.todo-count',
};

export const NODE_NAME = {
  A: 'A',
  LABEL: 'LABEL',
};

export const CLASS_NAME = {
  TOGGLE: 'toggle',
  DESTROY: 'destroy',
  EDITING: 'editing',
  EDIT: 'edit',

  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  SELECTED: 'selected',
};

export const APP_STATE = {
  TODOS: 'todos',
  SELECTED_TAB: 'selectedTab',
};

export const TODO_KEY = '2sooy';

export const MESSAGE = {
  NO_INPUT_KEYWORD: '🔥할일을 입력해주세요 !',
  UNDEFINED_TAB: '올바르지 않은 TAB이름입니다.',
  UNDEFINED_KEY: '등록되지 않은 KEY 입력입니다.',
  NOT_HTML_ELEMENT: 'HTML Element가 존재하지 않습니다.',
  NOT_TYPE_ARRAY: 'type이 Array가 아닙니다.',
  NOT_TYPE_FUNCTION: 'type이 function이 아닙니다.',
  NO_TODOS_PROPERTY: `${APP_STATE.TODOS} 프로퍼티가 존재하지 않습니다.`,
  NO_SELECTED_TAB_PROPERTY: `${APP_STATE.SELECTED_TAB} 프로퍼티가 존재하지 않습니다.`,
};
