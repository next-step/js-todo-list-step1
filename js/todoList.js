export default function TodoList({ todoItems, onComplete, onRemove }) {
  this.$todoList = document.querySelector(".todo-list");

  this.render = () => {
    const template = todoItems.map((todo) => todo.getTemplate());

    this.$todoList.innerHTML = template.join("");

    document.querySelector(".toggle")?.addEventListener("change", (e) => {
      onComplete(e.target.parentElement.id);
    });

    document.querySelector(".destroy")?.addEventListener("click", (e) => {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        onRemove(e.target.parentElement.id);
      }
    });
  };
}
