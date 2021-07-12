export default function TodoList({
  todoItems,
  onComplete,
  onRemove,
  onModify,
}) {
  this.$todoList = document.querySelector(".todo-list");

  this.render = (newTodoItems) => {
    this.$todoList.innerHTML = newTodoItems
      .map((todo) => todo.getTemplate())
      .join("");

    const toggleHandler = (e) => {
      onComplete(e.target.parentElement.id);
    };

    newTodoItems.map((item) => {
      document
        .getElementById(item.id)
        .children[0].addEventListener("change", toggleHandler);
    });

    document.querySelector(".destroy")?.addEventListener("click", (e) => {
      if (confirm("정말 삭제하시겠습니까?")) {
        onRemove(e.target.parentElement.id);
      }
    });

    const escapeHandler = ({ key }) => {
      if (key === "Escape") {
        document.querySelector(".editing")?.classList.remove("editing");
      }
      if (key === "Enter") {
        const i = document.querySelector(".editing")?.children[0].id;
        console.dir(document.querySelector(".edit"));
        onModify(i, document.querySelector(".edit").value);
      }
    };

    document.querySelector(".view")?.addEventListener("dblclick", (e) => {
      e.target.parentElement.parentElement.classList.add("editing");
      window.addEventListener("keydown", escapeHandler);
    });
  };
}
