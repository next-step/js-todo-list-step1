export default function TodoList(data) {
	return data.reduce((totalEl, { text, isCompleted }, index, { length }) => {
		const isCheck = isCompleted ? 'completed' : '';

		return (totalEl += `<li class="${isCheck}" data-todo-id="${index}">
          <div class="view">
            <input class="toggle" type="checkbox" ${!!isCheck ? 'checked' : ''} />
            <label class="label">${text}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${text}" />
        </li>`);
	}, '');
}
