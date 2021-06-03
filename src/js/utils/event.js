<<<<<<< HEAD
import { EVENT, KEYS, TRIGGER } from "../const/CONST.js";
import { upsertItem, deleteItem } from "../store/todoList.js";
import { getEletemt, getTriggerEventName } from "./element.js";
import { startEditing, stopEditing } from "./helper.js";
=======
import { upsertItem, deleteItem } from "../store/todoList.js";
import { getEletemt, getTriggerEventName } from "./element.js";
import { stopEditing } from "./helper.js";
>>>>>>> d6b99b4c9772ac0892fd1faa79029bc450296dc5

const $todoapp = getEletemt('.todoapp');
const $todoList = getEletemt('.todo-list');

<<<<<<< HEAD
const eventTypes = Object.values(EVENT);

export const eventKeys = Object.values(KEYS);
=======
const eventTypes = ['keyup', 'click', 'change', 'dblclick'];
export const eventKeys = ['Enter', 'Escape'];
>>>>>>> d6b99b4c9772ac0892fd1faa79029bc450296dc5

const event = {
  [EVENT.KEYUP]: {
    [KEYS.ENTER]: (event) => upsertItem(event),
    [KEYS.ESCAPE]: ({ target }) => stopEditing(target),
  },
  [EVENT.CLICK]: {
    [TRIGGER.DELETE]: ({ id }) => deleteItem(id)
  },
  [EVENT.CHANGE]: {
    [TRIGGER.UPDATE_COMPLETED]: (event) => upsertItem(event)
  },
  [EVENT.DBLCLICK]: {
    [TRIGGER.UPDATE_EDITING_MODE]: ({ target }) => startEditing(target)
  }
}

const eventHandler = (name, e) =>  {
  const trigger = getTriggerEventName(e);
  const eventName = event[name];

  if (!eventName) return;
  if (!eventName[trigger]) return;

  eventName[trigger](e);
}

export const setEvent = () => {
  eventTypes.forEach(type => {
    const $element = type === EVENT.KEYUP ? $todoapp : $todoList;
    $element.addEventListener(type, event => eventHandler(type, event));
  });
}

export const removeEvent = () => {
  eventTypes.forEach(type => {
<<<<<<< HEAD
    const $element = type === EVENT.KEYUP ? $todoapp : $todoList;
=======
    const $element = type === 'keyup' ? $todoapp : $todoList;
>>>>>>> d6b99b4c9772ac0892fd1faa79029bc450296dc5
    $element.removeEventListener(type, eventHandler)
  });
}