import { CUSTOM_EVENT } from "../CONST.js";

export default function({ id, completed, text }) {
  return `
  <li id=${id} class="todo-item ${completed ? 'completed' : ''}">
    <div class="view">
      <input id="${id}" data-event="${CUSTOM_EVENT.UPDATE_COMPLETED}" class="toggle ${completed ? 'completed' : ''}" type="checkbox" ${completed ? 'checked' : ''} />
      <label class="label">${text}</label>
      <button data-event="${CUSTOM_EVENT.DELETE}" id="${id}" class="destroy"></button>
    </div>
    <input id="${id}" data-event="${CUSTOM_EVENT.UPDATE_TEXT}" class="edit" value="${text}" />
  </li>
  `
}