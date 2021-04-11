export const newTodoTemplate = (title, id, isCompleted, isEditing) => {
    return `<li id=${id} class='${isCompleted ? 'completed' : 'false'} ${isEditing ? 'editing' : ''}'>
    <div class="view">
      <input class="toggle" type="checkbox" id=${id} ${isCompleted ? 'checked' : 'false'} />
      <label class="label">${title}</label>
      <button class="destroy" id=${id}></button>
    </div>
    <input class="edit" value="${title}" />
  </li>`
}
