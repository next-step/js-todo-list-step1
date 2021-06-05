export default function({ id, completed, text }) {
  return `
  <li id=${id}>
    <div class="view">
      <input id="${id}" class="toggle ${completed ? 'completed' : ''}" type="checkbox" ${completed ? 'checkted' : ''} />
      <label class="label">${text}</label>
      <button id="${id}" class="destroy"></button>
    </div>
    <input id="${id}" class="edit" value="${text}" />
  </li>
  `
}