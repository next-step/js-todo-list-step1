import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import { ACTIVE, COMPLETED } from "../utils/constants.js";


export default function TodoApp() {
    this.todoItems = [];

    this.todoList = new TodoList({
        onHandleToggle: id => {
            this.onHandleToggle(id);
        }
    });

    this.setState = updatedItems => {
        this.todoItems = updatedItems;
        this.todoList.render(this.todoItems);

    };

    this.onHandleToggle = targetId => {
        const $index =  this.todoItems.findIndex(item => item.id === Number(targetId));

        let updatedItems = [ ...this.todoItems ];
        updatedItems[$index] = {... updatedItems[$index],
            status: updatedItems[$index].status === ACTIVE ? COMPLETED : ACTIVE,
            checked: !updatedItems[$index].checked
        };
        this.setState(updatedItems);
    };

    this.onDelete = () => {
        //TODO
    };

    new TodoInput({
        todoItems: this.todoItems,
        onAdd: item => {
            const maxId = Math.max(...this.todoItems.map(item => item.id), 0);
            this.todoItems.push({ ...item, id: maxId + 1 });
            this.setState(this.todoItems);
        }
    });

}
