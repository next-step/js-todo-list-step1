/**
 *
 * @param {string} title
 */

export const todoTemplates = (title) => `
<li>
    <div class="view">
        <input class="toggle" type="checkbox"/>
        <label class="label">${title}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit"/>
</li>`;

export const todoListTemplates = (datas) => datas.map((v) => todoTemplates(v));
