import {TODO_TAB_STATUS} from "../utils/constant.js";

function TodoTab({$target, selectTodoTab: selectTodoTab}) {
    this.init = () => {
        this.$target = $target;

        this.addEvents();
        this.render();
    }

    this.addEvents = function () {
        $target.addEventListener("click", this.selectTabEvent);
    }

    this.selectTabEvent = $event => {
        document.querySelector(".selected").classList.remove(TODO_TAB_STATUS.SELECTED);
        $event.target.classList.add(TODO_TAB_STATUS.SELECTED);

        selectTodoTab($event.target.hash);
    }

    this.render = () => {
        this.$target.innerHTML = `
            <li>
                <a class="all selected" href="/#">전체보기</a>
            </li>
            <li>
                <a class="active" href="#active">해야할 일</a>
            </li>
            <li>
                <a class="completed" href="#completed">완료한 일</a>
            </li>
        `
    }

    this.init();
}

export default TodoTab;
