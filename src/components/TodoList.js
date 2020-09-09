import TodoItem from './TodoItem.js';

const TodoList = () => {

    return ({ todoItems }) =>
        todoItems?.map((item, index) => TodoItem({ ...item, index })).join('') || '';
};

export default TodoList;
