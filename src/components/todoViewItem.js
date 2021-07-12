const todoViewItem = (content, completed) => {
  return `
    <div class="view">
        <input class="toggle" type="checkbox" ${completed && 'checked'}/>
        <label class="label">${content}</label>
        <button class="destroy"></button>
    </div>
    `;
};

export default todoViewItem;
