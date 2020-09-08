import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import { ACTIVE, EDITING, COMPLETED } from "../utils/constants.js";
import TodoCount from "./TodoCount.js";

export default function TodoApp() {
    this.todoItems = [];

    this.todoList = new TodoList({
        onHandleToggle: id => this.onHandleToggle(id),
        onEdit: (id, flag) => this.onEdit(id, flag),
        onDelete: id => this.onDelete(id),
        saveTodoItems: (targetId, todoContext) => this.saveTodoItems(targetId, todoContext)
    });

    this.setState = updatedItems => {
        this.todoItems = updatedItems;
        this.todoList.setState(this.todoItems);

        new TodoCount({
            todoItems: this.todoItems
        });
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


    this.saveTodoItems = (targetId, todoContext) => {
        const $index =  this.todoItems.findIndex(item => item.id === Number(targetId));

        let updatedItems = [ ...this.todoItems ];
        updatedItems[$index] = {... updatedItems[$index],
            status: ACTIVE,
            title: todoContext
        };
        this.setState(updatedItems);
    };

    // editing
    this.onEdit = (targetId ,flag) => {
        const $index =  this.todoItems.findIndex(item => item.id === Number(targetId));

        let updatedItems = [ ...this.todoItems ];
        updatedItems[$index] = {... updatedItems[$index],
            status: flag === true ? EDITING : ACTIVE
            // status: updatedItems[$index].status === ACTIVE ? EDITING : ACTIVE,
        };
        this.setState(updatedItems);
    };

    this.onDelete = targetId => {
        const $index =  this.todoItems.findIndex(item => item.id === Number(targetId));
        let updatedItems = [ ...this.todoItems ];
        if($index > -1) updatedItems.splice($index, 1);
        this.setState(updatedItems);
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
