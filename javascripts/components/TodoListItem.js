import ItemWrapper from "./todo-item/TodoItemWrapper.js";
import ItemCheckBox from "./todo-item/TodoItemCheckBox.js";
import ItemTitle from "./todo-item/TodoItemTitle.js";
import ItemDestroy from "./todo-item/TodoItemDestroy.js";

export default function TodoListItem({todo, removeTodo, changeTodoDone}) {

    const {id, title, isDone} = todo;

    const liElement = document.createElement("li");
    if(isDone) {
        liElement.classList.add("completed")
    }

    const checkboxElement = document.createElement("input")
    checkboxElement.checked = isDone
    checkboxElement.type = 'checkbox';
    checkboxElement.classList.add("toggle");
    checkboxElement.addEventListener("click", () => {
        changeTodoDone(id, checkboxElement.checked)
    });

    const titleElement = () => {
        const element = document.createElement("label");
        titleElement.textContent = title;
    }

    const destroyElement = () => {
        const element = document.createElement("span");
        destroyElement.classList.add("destroy");
        destroyElement.addEventListener("click" , () => {
            if(confirm("삭제하시겠습니까?")) {
                removeTodo(id);
            }
        })
        return element
    }

    const render = () => {
        liElement.appendChild(checkboxElement)
        liElement.appendChild(titleElement())
        liElement.appendChild(destroyElement())
        return liElement;
    }

    return {
        render
    }
}

// export default function TodoListItem({todo, removeTodo, changeTodoDone}) {
//
//     const {id, title, isDone} = todo;
//
//     const li = new ItemWrapper();
//     const todoCheckbox = new ItemCheckBox({id, isDone, changeTodoDone})
//     const todoTitle = new ItemTitle({title});
//     const todoDestroy = new ItemDestroy({id, removeTodo});
//
//
//     const render = () => {
//         return li.addItemChild({todoCheckbox,todoTitle,todoDestroy}).render()
//     }
//
//     return {
//         render
//     }
// }

