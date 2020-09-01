export default function ($todoInput, { onAdd }) {
  const onKeydownInput = (event) => {
    const $newTodoTarget = event.target;

    if ($newTodoTarget.value.trim() && event.key === "Enter") {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

  $todoInput.addEventListener("keydown", onKeydownInput);
}
