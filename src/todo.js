import { makeElement } from "./utils.js";

export const makeTodo = ({ key, text, isComplete }) => {
  const todo = makeElement("li", {
    className: isComplete ? "completed" : "destroy",
  });
  const toggle = makeElement("input", {
    className: "toggle",
    type: "checkbox",
  });
  const label = makeElement("label", { innerHTML: text });

  todo.appendChild(toggle);
  todo.appendChild(label);

  return todo;
};
