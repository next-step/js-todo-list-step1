import { render } from './render.js';

const store = JSON.parse(localStorage.getItem('state')) ||
    {
        todoItems: [],
        filter: 'all',
    };


export const getFilter = () => store.filter;

export const getItems = () => {
    const { todoItems, filter } = store;
    return todoItems.filter(item => {
        if (filter === 'all') return true;
        if (filter === 'active') return !item.complete;
        if (filter === 'completed') return item.complete;
    });
};

export const addItem = (contents) => {
    const { todoItems } = store;

    const newTodoItems = [
        ...todoItems,
        { contents, complete: false, editing: false },
    ];
    setStore({ todoItems: newTodoItems });
};

export const deleteItem = (index) => {
    const { todoItems } = store;

    const newTodoItems = [...todoItems];
    newTodoItems.splice(index, 1);

    setStore({ todoItems: newTodoItems });
};

export const setItem = (index, payload) => {
    const { todoItems } = store;

    const newTodoItems = [...todoItems];
    newTodoItems[index] = {
        ...newTodoItems[index],
        ...payload,
    };

    setStore({ todoItems: newTodoItems });

};

export const setFilter = (filter) => {
    setStore({ filter });
};

const setStore = (payload) => {
    for (const key in payload)
        store[key] = payload[key];

    localStorage.setItem('state', JSON.stringify(store));

    render({ todoItems: getItems(), filter: getFilter() });
};


