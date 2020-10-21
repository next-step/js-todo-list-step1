'use strict'

const blinding = (iter, on = null) => {
    const action = on == null ?
        "toggle" :
        on ?
            "add" :
            "remove"

    for (const item of iter) {
        item.classList[action]('blind');
    }
};

const toHtml = source => {
    let $div = document.createElement("div");
    $div.innerHTML = source;
    return $div.firstElementChild;
}

class TodoApp {
    constructor() {
        this.$todoInput = document.getElementById("new-todo-title");
        this.$todoList = document.getElementById("todo-list");
        this.$todoFooter = document.querySelector(".count-container");
        this.previous = "";
        this.build();
        this.eventRegist();
    }

    getTodoEntity(idx) {
        let $todoItem = this.$todoList.querySelector(`[data-idx='${idx}']`);
        return {
            idx:Number(idx),
            value:$todoItem.querySelector('.label').textContent,
            check:$todoItem.querySelector('.toggle').checked
        }
    }

    getLastIndex() {
        let todoItems = lsg.get('todoItems');
        let max = 0;
        if (!todoItems || todoItems.length === 0) return max;

        for (const item of todoItems) {
            if (max < item.idx) max = item.idx;
        }
        return max;
    }

    getNextIndex() {
        return this.getLastIndex() + 1;
    }

    save = (entity) => {
        let todoItems = lsg.get("todoItems");
        if (!todoItems) todoItems = [];
        let findItem = todoItems.find(a => a.idx === entity.idx);
        if (findItem) {
            findItem.value = entity.value;
            findItem.check = entity.check;
        } else {
            todoItems.push(entity);
        }
        lsg.set('todoItems', todoItems);
    }
    delete = (idx) => {
        if(whatType(idx)==="string")idx = Number(idx);
        let todoItems = lsg.get("todoItems");
        let newTodoItems = [];
        if (todoItems.length > 0) {
            for (const todoItem of todoItems) {
                if (todoItem.idx !== idx) {
                    newTodoItems.push(todoItem);
                }
            }
        }
        lsg.set('todoItems', newTodoItems);
    }

    //LocalStorage확인 후 Load하는 함수
    build = () => {
        let todoItems = lsg.get("todoItems");
        if (todoItems.length) {
            for (const item of todoItems) {
                this.$todoList.append(this.getFrame(item.idx, item.value, item.check));
            }
            this.updateCount();
        }
    }

    //이벤트 등록
    eventRegist = () => {
        this.$todoInput.addEventListener('keyup', this.onAddInput);
        this.$todoFooter.addEventListener('click', this.switchTap);
        this.$todoList.addEventListener('click', this.onChangeToggle);
        this.$todoList.addEventListener('dblclick', this.onEditingByDblClick);
        this.$todoList.addEventListener('keyup', this.onEditingByKeyup);
    }

    //수정적용 및 취소
    onEditingByKeyup = ({ target, key }) => {
        if (!target) return;
        const close = () => target.parentElement.classList.remove('editing');
        if (target.tagName === "INPUT" && key === "Escape") {
            target.parentElement.classList.remove('editing');
            target.value = this.previous;
            close();
        } else if (target.tagName === "INPUT" && key === "Enter") {
            //TODO 공백으로 만든 뒤 엔터를 칠 경우의 로직 구현 필요
            target.previousElementSibling.querySelector(".label").textContent = target.value;
            this.save(this.getTodoEntity(target.parentElement.dataset["idx"]));
            close();
        }
        this.updateCount();
    }

    //double click 이벤트 - 수정하기
    onEditingByDblClick = ({ target }) => {
        if (!target) return;
        if (target.tagName === "LABEL") {
            this.previous = target.textContent;
            target.parentElement.parentElement.classList.add('editing');
        }
        this.updateCount();
    }

    //todoItems 완료 및 삭제
    onChangeToggle = ({ target }) => {
        if (!target) return;
        const cls = target.classList;
        if (cls.contains("toggle")) {
            let findTarget = target.parentElement.parentElement;
            findTarget.classList.toggle('completed');
            this.save(this.getTodoEntity(findTarget.dataset['idx']));
            let currentTap = this.$todoFooter.querySelector(".selected");
            currentTap.click();
        } else if (cls.contains("destroy")) {
            let findTarget = target.parentElement.parentElement;
            this.delete(findTarget.dataset["idx"]);
            findTarget.remove();
            this.updateCount();
        }
    }

    //하단 카운트 업데이트
    updateCount = () => {
        let count = this.$todoList.querySelectorAll("li:not(.blind)").length + "";
        this.$todoFooter.querySelector(".todo-count>strong").textContent = count;
    }

    //하단 탭 변경 로직
    switchTap = ({ target }) => {
        const getCheckedItems = (on) => {
            let resultList = [];
            for (const item of this.$todoList.querySelectorAll(`li`)) {
                if (item.querySelector(".toggle").checked === on) {
                    resultList.push(item);
                }
            }
            return resultList;
        }
        if (target && target.tagName === "A") {
            let $todoItems = this.$todoList.getElementsByTagName("LI");
            this.$todoFooter.querySelector(".selected").classList.remove('selected');
            target.classList.add('selected');
            let cls = target.classList;
            if (cls.contains("all")) {
                blinding($todoItems, false);
            } else if (cls.contains("active")) {
                blinding($todoItems, true);
                blinding(getCheckedItems(false), false);
            } else if (cls.contains("completed")) {
                blinding($todoItems, true);
                blinding(getCheckedItems(true), false);
            }
        }
        this.updateCount();
    }

    //todoItme 추가 로직
    onAddInput = ({ target, key }, check = false) => {
        if (target && key === "Enter" && target.value !== "") {
            const idx = this.getNextIndex();
            this.$todoList.append(this.getFrame(idx, target.value, check));
            this.save({idx, value:target.value, check});
            target.value = '';
            this.updateCount();
        }
    }

    //todoItem Frame Maker
    getFrame = (idx, value, check) => {
        const frame = toHtml(
            `<li class="${check ? 'completed' : ''}" data-idx="${idx}">
                       <div class="view">
                         <input class="toggle" type="checkbox" ${check ? 'checked' : ''}/>
                         <label class="label">${value}</label>
                         <button class="destroy"></button>
                       </div>
                       <input class="edit" value="${value}" />
                    </li>`);
        return frame;
    };

}

window.addEventListener('DOMContentLoaded', async (event) => {
    const todoApp = new TodoApp();
});
