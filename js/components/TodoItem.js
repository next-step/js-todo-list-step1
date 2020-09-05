const TodoItem = ({id, text, done}) => `
	<li class="${done ? 'completed' : ''}">
		<input type="checkbox" class="toggle" data-id=${id} data-role="toggle" ${done?'checked':''} />
		<label>${text}</label>
		<i class="destroy" data-id=${id} data-role="remove"/>
	</li>
`;

export default TodoItem;