export const getEletemt = (className) => document.querySelector(className);

export const addClassName = ($element, className) => $element.classList.add(className);

export const removeClassName = ($element, className) => $element.classList.remove(className);

export const getTriggerEventName = (event) => {
  if (keys.includes(event.key)) return event.key;
  return event.target.dataset.event;
}

export const getTodoItemElement = target => target.closest('.todo-item');