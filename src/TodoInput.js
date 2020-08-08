export default function ($todoInput, { onAdd }) {
  $todoInput.addEventListener("keydown", (event) => {
    const $newTodoTarget = event.target;
    // input이 비어있지 않고 enter키 입력 시
    if ($newTodoTarget.value.trim() && event.key === "Enter") {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  });
}
