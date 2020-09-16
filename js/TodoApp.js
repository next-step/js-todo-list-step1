import TodoList from "./TodoList.js";
import TodoItem from "./TodoItem.js";
import TodoCount from "./TodoCount.js";
import TodoInput from "./TodoInput.js";
import {getStorage, setStorage} from "./Storage.js";

function TodoApp(){
    let todoItems;
    let filter = "all";

    const setState = updatedItems => {
        todoItems = updatedItems;
        setStorage(todoItems);

        const filterTodoItems = todoItems.filter(onFilter);
        todoList.setState(filterTodoItems);
        todoCount.setstate(filterTodoItems.length);
    };

    const onFilter = item => {
        return filter === "all" ? true : item.type === filter;
    };

    const getIdx = id => {
        return todoItems.findIndex(item => item.id === parseInt(id));
    };

    const todoList = new TodoList({
        onToggle: (id, type) => {
            let newTodoItems = [...todoItems];
            newTodoItems[getIdx(id)].type = type;
            setState(newTodoItems);
        },
        onRemove: (id) => {
            let newTodoItems = [...todoItems];
            newTodoItems.splice(getIdx(id), 1);
            setState(newTodoItems);
        },
        onMod: (id, title) => {
            let newTodoItems = [...todoItems];
            newTodoItems[getIdx(id)].title = title;
            setState(newTodoItems);
        }
    });

    new TodoInput({
        onAdd: title => {
            const nextId = todoItems.length > 0 ? todoItems[todoItems.length - 1].id + 1 : 1;
            const newTodoItem = new TodoItem(title, nextId);
            todoItems.push(newTodoItem);
            setState(todoItems);
        }
    });

    const todoCount = new TodoCount({
        onChangeFilter: new_filter => {
            filter = new_filter;
            setState(todoItems);
        }
    });

    setState(getStorage());
};

new TodoApp();