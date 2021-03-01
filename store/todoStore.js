const store = window.localStorage;
const TODO_ITEMS_KEY = 'TODO_ITEMS_KEY';

export const localStore =  {

    setTodoItems({todoItems}) {
        store.setItem(TODO_ITEMS_KEY, JSON.stringify(todoItems));
    },

    getTodoItems() {
        try {
            return JSON.parse(store.getItem(TODO_ITEMS_KEY));
        } catch (e) {
            console.error(e);
        }
    },

};