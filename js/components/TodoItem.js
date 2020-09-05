const TodoItem = ({id, text, done, edit}) => `
	<li class="${done ? 'completed' : ''} ${edit ? 'editing' : ''}">
		<input type="checkbox" class="toggle" data-id=${id} data-role="toggle" ${done ? 'checked' : ''} />
		<label class="view" data-id=${id} data-role="edit">${text}</label>
		<input class="edit" value=${text} data-id=${id} data-role="change" />
		<i class="destroy" data-id=${id} data-role="remove"/>
	</li>
`;

export default TodoItem;