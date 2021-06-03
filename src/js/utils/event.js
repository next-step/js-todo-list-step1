import { CLASS_NAME, EVENT, KEYS, TRIGGER } from "../const/CONST.js";
import { upsertItem, deleteItem } from "../store/todoList.js";
import { getEletemt, getTriggerEventName } from "./element.js";
import { startEditing, stopEditing } from "./helper.js";

const $todoapp = getEletemt(CLASS_NAME.$APP);
const $todoList = getEletemt(CLASS_NAME.$LIST);

const eventTypes = Object.values(EVENT);

export const eventKeys = Object.values(KEYS);

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
    const $element = type === EVENT.KEYUP ? $todoapp : $todoList;
    $element.removeEventListener(type, eventHandler)
  });
}