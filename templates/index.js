export const createTodoTemplete = (text, isActive) => `
	<div class="view">
		<input class="toggle" type="checkbox" ${!isActive && 'checked'}/>
		<label class="label">${text}</label>
		<button class="destroy"></button>
	</div>
	<input class="edit" value="${text}" />
`;
