import TodoModel from "../model/todoModel.js";
import { EVENT_NAME, SELECTOR, CLASS_NAME } from "../utils/constants.js";
import { todoItemHTMLTemplate } from "../utils/template.js";
import { isESC, isEnter } from "../utils/functions.js";

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
    this.$target.innerHTML = todos.map(todoItemHTMLTemplate).join("");
  };

  this.bindEvent = () => {
    const todoItemClickHandler = ({ target }) => {
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

    const inputDbClickHandler = ({ target }) => {
      const $li = target.closest("li");
      if ($li.classList.contains(CLASS_NAME.EDITING)) {
        return;
      }
      this.editInputValue = target.innerText; // 수정 시작할 때 초기 상태의 value 저장

      $li.classList.add(CLASS_NAME.EDITING);
      $li.querySelector(`.${CLASS_NAME.EDIT}`).focus();
    };

    const inputKeyUpHandler = (e) => {
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

    const inputFocusInHandler = ({ target }) => {
      if (!target.classList.contains(CLASS_NAME.EDIT)) {
        return;
      }
      target.selectionStart = target.value.length; // 맨 마지막 글자에 focus
    };

    const inputFocusOutHanlder = ({ target }) => {
      if (!target.classList.contains(CLASS_NAME.EDIT)) {
        return;
      }

      target.value = this.editInputValue; //초기상태의 value로 reset
      target.closest("li").classList.remove(CLASS_NAME.EDITING);
    };

    this.$target.addEventListener("click", todoItemClickHandler);
    this.$target.addEventListener("dblclick", inputDbClickHandler);
    this.$target.addEventListener("keyup", inputKeyUpHandler);
    this.$target.addEventListener("focusin", inputFocusInHandler);
    this.$target.addEventListener("focusout", inputFocusOutHanlder);
  };

  this.init();
}
