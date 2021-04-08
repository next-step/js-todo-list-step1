/**
 *
 * @param {string} title
 */

export const todoTemplates = (id, title) => `
<li data-id=${id}>
    <div class="view">
        <input class="toggle" type="checkbox"/>
        <label class="label">${title}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit"/>
</li>`;

export const todoListTemplates = (datas) => {
  let result = '';
  datas.forEach((v) => {
    result += todoTemplates(v.id, v.title);
  });
  return result;
};

export const todoCounterTemplates = (counter) =>
  `총 <strong>${counter}</strong> 개</span>`;
