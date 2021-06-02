import { getTriggerEventName } from './element.js';
import { upsertItem, deleteItem, stopEditing } from './todoList.js';
import { getEletemt } from './todoListRenderer.js';

const $todoapp = getEletemt('.todoapp');
const $todoList = getEletemt('.todo-list');

const eventTypes = ['keyup', 'click', 'change', 'dblclick'];

const event = {
  onkeyup: {
    Enter: (event) => upsertItem(event),
    Escape: ({ target }) => stopEditing(target),
  },
  onclick: {
    delete: ({ id }) => deleteItem(id)
  },
  onchange: {
    'update:completed': (event) => upsertItem(event)
  },
  ondblclick: {
    'update:editing-mode': ({ target }) => stopEditing(target)
  }
}

const eventHandler = (name, e) =>  {
  const type = `on${name}`;
  const trigger = getTriggerEventName(e);
  const eventName = event[type];

  if (!eventName) return;
  if (!eventName[trigger]) return;

  eventName[trigger](e);
}

export const setEvent = () => {
  eventTypes.forEach(type => {
    const $element = type === 'keyup' ? $todoapp : $todoList;
    $element.addEventListener(type, event => eventHandler(type, event));
  });
}

export const removeEvent = () => {
  eventTypes.forEach(type => $todoList.removeEventListener(type, eventHandler));
}