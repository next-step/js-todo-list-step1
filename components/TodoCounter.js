import {TODO_TAB_STATUS} from "../utils/constant.js";

function TodoCounter({$target, todoCounterState}) {
    this.init = () => {
        this.$target = $target;
        this.state = todoCounterState;

        this.render();
    }

    this.getSelectedTodoTypeCount = () => {
        const selectedTab = this.state.selectedTab;
        if (selectedTab === TODO_TAB_STATUS.ALL) {
            return this.state.todos.length;
        }

        if (selectedTab === TODO_TAB_STATUS.DONE) {
            return this.state.todos.filter(todo => todo.isCompleted).length;
        }

        if (selectedTab === TODO_TAB_STATUS.TODO) {
            return this.state.todos.filter(todo => !todo.isCompleted).length;
        }
    }

    this.setState = (updatedState) => {
        this.state = updatedState;

        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = `<span class="todo-count">총 <strong>${this.getSelectedTodoTypeCount()}</strong> 개</span>`;
    }

    this.init();
}

export default TodoCounter;
