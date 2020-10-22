import { makeElement } from "./utils.js";
import { setTodoStatus } from "./store.js";

export const makeTodo = ({ key, text, isComplete }) => {
  const todo = makeElement("li", {
    className: isComplete ? "completed" : "destroy",
  });
  const toggle = makeElement("input", {
    className: "toggle",
    type: "checkbox",
    checked: isComplete,
  });
  const label = makeElement("label", { innerHTML: text });

  todo.appendChild(toggle);
  todo.appendChild(label);

  toggle.addEventListener("change", (e) =>
    setTodoStatus(key, e.target.checked)
  );
  return todo;
};
