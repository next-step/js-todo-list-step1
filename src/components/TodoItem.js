/**
 * @return {string}
 */
export default function TodoItem(item) {

    const id = item.id || '';
    const status = item.status || '';
    const title = item.title || '';
    const checked = item.checked || false;

    return (`<li id="li-${id}" class=${status} >
    <div class="view">
      <input class="toggle" type="checkbox" ${checked ? 'checked' : ''} />
      <label class="label">${title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value=${title} />
  </li>`);
}
