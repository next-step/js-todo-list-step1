const TodoItem = ({id, text, done}) => `
	<li class="${done?'completed':''}"><label data-id=${id}>${text}</label></li>
`;

export default TodoItem;