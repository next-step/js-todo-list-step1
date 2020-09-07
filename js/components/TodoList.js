import TodoItem from "./TodoItem.js";

const TodoList = ({list}) => `
	${list.map(todo => TodoItem(todo)).join('')}
`;

export default TodoList;