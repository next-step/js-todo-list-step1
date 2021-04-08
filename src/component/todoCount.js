/* 
* TodoCount Component를 관리 (Read)
*/

import { getClassName } from "../utils/eventUtils.js";

export default function TodoCount(todoList) {
    this.$todoCount = document.querySelector(".count-container");
    
    this.count = updatedTodoItems => {
        this.$todoCount.querySelector("strong").innerHTML = updatedTodoItems.length;
    }
    
    this.linkStatus = () => {
        const hash = document.location.hash;
        checkStatus(hash, "#");
    }

    const onClick = event => {
        checkStatus(getClassName(event));
    }

    const checkStatus = (check, prefix="") => {
        if (check === prefix + "active") {
            todoList.active();
            return;
        }
        if (check === prefix + "completed") {
            todoList.completed();
            return;
        }
        todoList.all();
    }

    this.$todoCount.querySelector(".filters").addEventListener("click", onClick);
}
