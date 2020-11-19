export default insertTodoItem => {
  const input = document.getElementById("new-todo-title");

  const resetInput = () => (input.value = "");

  const addTodo = () => {
    const text = input.value.trim();

    resetInput();

    if (!text.length) {
      alert("정확한 값을 입력해주세요!");
      return;
    }

    insertTodoItem(text);
  };

  const keyHandler = {
    Enter: addTodo
  };

  const listener = e => {
    const handler = keyHandler[e.key];

    if (handler) {
      handler();
    }
  };

  input.addEventListener("keypress", listener);
};
