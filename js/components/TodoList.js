const TodoItem = ({id, text, done, edit}) => `
	<li class="${done ? 'completed' : ''} ${edit ? 'editing' : ''}">
		<div class="view">
			<input type="checkbox" class="toggle" data-id=${id} data-role="toggle" ${done ? 'checked' : ''} />
			<label data-id=${id} data-role="edit">${text}</label>
			<button class="destroy" data-id=${id} data-role="remove"/>
		</div>
		<input class="edit" value=${text} data-id=${id} data-role="change" />
	</li>
`;

const TodoList = ({list}) => `
	${list.map(todo => TodoItem(todo)).join('')}
`;

export default TodoList;