import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import { TodoItem } from "./TodoItem.js";
import TodoCount from "./TodoCount.js";
import { $ } from "../util/util.js";

export default function TodoApp() {
  this.itemId;
  this.todoItems;
  this.filter;

  this.todoInput = new TodoInput({
    onAdd: (event) => {
      if (event === undefined || event.target === undefined) {
        console.log("event가 존재 하지 않습니다.");
        return;
      }
      const $newTodoInput = event.target;

      if (event.key === "Enter") {
        if ($newTodoInput.value.length === 0) {
          alert("1글자 이상만 입력이 가능합니다.");
          return;
        }
        const newTodoItem = new TodoItem(
          $newTodoInput.value,
          this.itemId,
          "view"
        );
        this.todoItems.push(newTodoItem);
        this.setState(this.itemId + 1, this.todoItems, this.filter);
        $newTodoInput.value = "";
      }
    },
  });
  this.todoList = new TodoList({
    onClick: (event) => {
      if (event === undefined || event.target === undefined) {
        console.log("event가 존재 하지 않습니다.");
        return;
      }
      const $target = event.target;

      const $itemLi = $target.closest("li");
      if (
        $target.nodeName === "INPUT" &&
        $target.classList.contains("toggle")
      ) {
        // toggle 처리
        const item = this.todoItems.find((item) => item.id == $itemLi.id);
        if (item.status == "completed") {
          item.status = "view";
        } else {
          item.status = "completed";
        }
        this.setState(this.itemId, this.todoItems, this.filter);
      } else if (
        // 제거
        $target.nodeName === "BUTTON" &&
        $target.classList.contains("destroy") &&
        confirm("정말 삭제 하시겠습니까?")
      ) {
        this.deleteItemById($itemLi.id);
        this.setState(this.itemId, this.todoItems, this.filter);
      }
    },
    onDblClick: (event) => {
      if (event === undefined || event.target === undefined) {
        console.log("event가 존재 하지 않습니다.");
        return;
      }
      const $viewLabel = event.target;

      const $itemLi = $viewLabel.closest("li");
      if (
        $viewLabel.nodeName === "LABEL" &&
        $viewLabel.classList.contains("label")
      ) {
        // edit모드로 변경
        $itemLi.classList.remove("completed");
        $itemLi.classList.add("editing");

        $viewLabel.closest("div").nextElementSibling.focus();
      }
    },
    onKeyDown: (event) => {
      if (event === undefined || event.target === undefined) {
        console.log("event가 존재 하지 않습니다.");
        return;
      }
      const $editInput = event.target;

      if (
        $editInput.nodeName === "INPUT" &&
        $editInput.classList.contains("edit")
      ) {
        // edit input에 대한 keypress 이벤트 처리
        const $itemLi = $editInput.closest("li");

        if (event.key === "Enter") {
          if ($editInput.value.length == 0) {
            // 수정시 텍스트를 모두 지우면 그 item 삭제
            this.deleteItemById($itemLi.id);
          } else {
            // 수정 내용 반영
            const item = this.todoItems.find((item) => item.id == $itemLi.id);
            item.status = "view";
            item.contents = $editInput.value;
          }
          this.setState(this.itemId, this.todoItems, this.filter);
        } else if (event.key === "Escape") {
          // 수정 취소(기존 상태로 랜더링)
          this.setState(this.itemId, this.todoItems, this.filter);
        }
      }
    },
  });
  this.todoCount = new TodoCount({
    onClick: (event) => {
      if (event === undefined || event.target === undefined) {
        console.log("event가 존재 하지 않습니다.");
        return;
      }
      const $filterLi = event.target;

      if ($filterLi.nodeName === "A") {
        // 기존에 선택된 filter는 해제
        $(".selected").classList.remove("selected");

        if ($filterLi.classList.contains("all")) {
          this.filter = "all";
        } else if ($filterLi.classList.contains("active")) {
          this.filter = "active";
        } else if ($filterLi.classList.contains("completed")) {
          this.filter = "completed";
        }
        $filterLi.classList.add("selected");
        this.setState(this.itemId, this.todoItems, this.filter);
      }
    },
  });

  this.init = () => {
    let itemId = localStorage.getItem("itemId")
      ? parseInt(localStorage.getItem("itemId"))
      : 1;
    let todoItems = localStorage.getItem("todoItems")
      ? JSON.parse(localStorage.getItem("todoItems"))
      : [];
    "test", JSON.parse(localStorage.getItem("todoItems"));
    let filter = localStorage.getItem("filter")
      ? localStorage.getItem("filter")
      : "all";

    this.setState(itemId, todoItems, filter);
  };

  this.setState = (itemId, updatedItems, filter) => {
    this.itemId = itemId;
    this.todoItems = updatedItems;
    this.filter = filter;

    localStorage.setItem("itemId", itemId);
    localStorage.setItem("todoItems", JSON.stringify(updatedItems));
    localStorage.setItem("filter", filter);

    this.filteredItems = this.todoItems.filter(this.itemFiltered);
    this.todoList.setState(this.filteredItems);
    this.todoCount.setState(this.filteredItems.length);
  };

  this.deleteItemById = (id) => {
    const deleteIndex = this.todoItems.findIndex((item) => item.id == id);
    if (deleteIndex == -1) {
      console.log(`id가 ${id}인 item이 없습니다.`);
      return;
    }

    this.todoItems.splice(deleteIndex, 1);
  };

  this.itemFiltered = (item) => {
    if (this.filter === "all") {
      return true;
    } else if (this.filter === "active" && item.status === "view") {
      return true;
    } else if (this.filter === "completed" && item.status === "completed") {
      return true;
    }

    return false;
  };

  window.onload = this.init;
}
