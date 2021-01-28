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

    const $targetValue = target.closest('li').querySelector('.edit').value;
    let index=0;

    todoItems.forEach((item)=>{
        if(item.value === $targetValue) return;
        index ++;
    });

    todoItems.splice(index, 1);
    saveTodo();
}

const saveTodo = () => {
    localStorage.setItem('todo',JSON.stringify(todoItems));
}