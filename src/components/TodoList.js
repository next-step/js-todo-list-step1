import TodoItem from './TodoItem.js';

const TodoList = ({ todoItems }) => {
    return todoItems?.map((item, index) => TodoItem({ ...item, index })).join('') || '';
};

export default TodoList;
