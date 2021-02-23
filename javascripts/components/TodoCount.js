export default function TodoCount({todoItems}) {


    const totalCount = size => {
        const todoCount = document.querySelector(".todo-count strong")
        todoCount.textContent = size;
    }

    totalCount(todoItems.length);
}