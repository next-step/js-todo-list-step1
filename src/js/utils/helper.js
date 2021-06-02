export const stopEditing = (target) => {
  const $item = getTodoItemElement(target);
  removeClassName($item, 'editing');
}

export const startEditing = (target) => {
  const $item = getTodoItemElement(target);
  addClassName($item, 'editing')
}