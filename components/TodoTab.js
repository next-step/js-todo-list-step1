import {TODO_TAB_STATUS, HASH_LOCATION} from "../utils/constant.js";

function TodoTab({$target, selectedTab, selectTodoTab}) {
    this.init = () => {
        this.$target = $target;
        this.selectedTab = selectedTab;

        this.addEvents();
        this.render();
    }

    this.addEvents = function () {
        $target.addEventListener("click", this.selectTabEvent);
    }

    this.selectTabEvent = $event => {
        const hashValue = $event.target.hash;
        if (hashValue === HASH_LOCATION.ALL) {
            selectTodoTab(TODO_TAB_STATUS.ALL);
            return;
        }
        if (hashValue === HASH_LOCATION.ACTIVE) {
            selectTodoTab(TODO_TAB_STATUS.TODO);
            return;
        }
        if (hashValue === HASH_LOCATION.COMPLETED) {
            selectTodoTab(TODO_TAB_STATUS.DONE);
        }
    }

    this.setState = (selectedTab) => {
        this.selectedTab = selectedTab;

        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = `
            <li>
                <a class="all ${this.selectedTab === TODO_TAB_STATUS.ALL ? "selected" : ""}" href="/#">전체보기</a>
            </li>
            <li>
                <a class="active ${this.selectedTab === TODO_TAB_STATUS.TODO ? "selected" : ""}" href="#active">해야할 일</a>
            </li>
            <li>
                <a class="completed ${this.selectedTab === TODO_TAB_STATUS.DONE ? "selected" : ""}" href="#completed">완료한 일</a>
            </li>
        `
    }

    this.init();
}

export default TodoTab;
