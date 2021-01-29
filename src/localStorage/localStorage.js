export let todoItems = [];

export const addToStorage = (value, status) => {

    const newItem = {
        value,
        status
    }

    todoItems = [...todoItems, newItem];
    saveTodo();

}

export const removeFromStorage = (target) => {

    const index = findIndexOfTarget(target);
   
    todoItems.splice(index, 1);
    saveTodo();
}

const saveTodo = () => {
    localStorage.setItem('todo',JSON.stringify(todoItems));
}

export const editStorage = (target) => {

    const index = findIndexOfTarget(target);
    const value = target.closest('li').querySelector('.edit').value;
    console.log(value);

    console.log(todoItems[index].value);
    //todoItems[index].value = value;
    saveTodo();
}

const findIndexOfTarget = (target) => {
    const targetValue = target.closest('li').querySelector('.edit').value;
    const index = todoItems.findIndex(obj => obj.value === targetValue);

    return index;
}