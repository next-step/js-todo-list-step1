const Template = (obj) => {
    return `
    <li id="item-${obj.id}">
        <div class="view">
        <input class="toggle" type="checkbox"/>
        <label class="label">${obj.context}</label>
        <button class="destroy"></button>
        </div>
        <input class="edit" value="${obj.context}" />
    </li>
    `
}
const TemplateEditing = (obj) => {
  return `
  <li class="editing">
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label class="label">완료된 타이틀</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="완료된 타이틀" />
  </li>`
}
const TemplateCompleted = (obj) => {
  return `
  <li class="completed">
    <div class="view">
      <input class="toggle" type="checkbox" checked/>
      <label class="label">완료된 타이틀</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="완료된 타이틀" />
  </li>`
}

export { Template, TemplateEditing, TemplateCompleted }