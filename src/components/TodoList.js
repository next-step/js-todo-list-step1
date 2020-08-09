import TodoModel from "../model/todoModel.js";
import { EVENT_NAME, SELECTOR, CLASS_NAME } from "../../utils/constants.js";
import { todoItemHTMLTemplate } from "../../utils/template.js";
import { isESC, isEnter } from "../../utils/functions.js";

export default function TodoList() {
  if (new.target !== TodoList) {
    return new TodoList();
  }

  this.init = () => {
    this.$target = document.querySelector(`.${SELECTOR.TODO_LIST}`);
    TodoModel.subscribe(EVENT_NAME.TODO_CHANGED, this, this.render);
    this.bindEvent();
    this.render(TodoModel.get());
  };

  this.render = (todos) => {
    console.log("TODOLIST", todos);
    this.$target.innerHTML = todos.map(todoItemHTMLTemplate).join();
  };

  this.bindEvent = () => {
    const clickEventHandler = ({ target }) => {
      const li = target.closest("li");
      const { id } = li.dataset;
      if (target.classList.contains(CLASS_NAME.TOGGLE)) {
        TodoModel.toggle(Number(id));
        return;
      }
      if (target.classList.contains(CLASS_NAME.REMOVE)) {
        TodoModel.remove(Number(id));
      }
    };

    const dblclickEventHandler = ({ target }) => {
      const $li = target.closest("li");
      if ($li.classList.contains(CLASS_NAME.EDITING)) {
        return;
      }
      this.editInputValue = target.innerText; // 수정 시작할 때 초기 상태의 value 저장

      $li.classList.add(CLASS_NAME.EDITING);
      $li.querySelector(`.${CLASS_NAME.EDIT}`).focus();
    };

    const keyUpEventHandler = (e) => {
      if (!isESC(e.key) && !isEnter(e.key)) {
        return;
      }
      const { target } = e;
      const $li = target.closest("li");

      if (isESC(e.key)) {
        $li.classList.remove(CLASS_NAME.EDITING);
        return;
      }

      $li.classList.remove(CLASS_NAME.EDITING);
      TodoModel.edit(Number($li.dataset.id), target.value);
    };

    const focusInEventHandler = (e) => {
      if (e.target.tagName === "INPUT" && e.target.className === "edit") {
        e.target.selectionStart = e.target.value.length;
      }
    };

    const focusOutEventHandler = (e) => {
      if (e.target.tagName === "INPUT" && e.target.className === "edit") {
        e.target.value = this.editInputValue; //초기상태의 value로 reset
        const li = e.target.closest("li");
        if (li.classList.contains("editing")) {
          li.classList.remove("editing");
        }
      }
    };

    this.$target.addEventListener("click", clickEventHandler);
    this.$target.addEventListener("dblclick", dblclickEventHandler);
    this.$target.addEventListener("keyup", keyUpEventHandler);
    this.$target.addEventListener("focusin", focusInEventHandler); // 맨 마지막 글자에 focus
    this.$target.addEventListener("focusout", focusOutEventHandler);
  };

  this.setState = (nextTodos) => {
    this.todos = nextTodos;
    this.render();
  };

  this.init();
}
