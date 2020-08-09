export default function ($todoInput, { onAdd }) {
  $todoInput.addEventListener("keydown", (event) => {
    const $newTodoTarget = event.target;

    if ($newTodoTarget.value.trim() && event.key === "Enter") {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  });
}
