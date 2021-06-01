export default function TodoList({
  todoItems,
  onComplete,
  onRemove,
  onModify,
}) {
  this.$todoList = document.querySelector(".todo-list");

  this.render = (todoItems) => {
    this.$todoList.innerHTML = todoItems
      .map((todo) => todo.getTemplate())
      .join("");

    document.querySelector(".toggle")?.addEventListener("change", (e) => {
      onComplete(e.target.parentElement.id);
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
        const i = document.querySelector(".editing").children[0].id;
        console.dir(document.querySelector(".edit"));
        onModify(i, document.querySelector(".edit").value);
      }
    };

    document.querySelector(".view")?.addEventListener("dblclick", (e) => {
      console.dir(e.target);
      e.target.parentElement.parentElement.classList.add("editing");
      window.addEventListener("keydown", escapeHandler);
    });
  };
}
