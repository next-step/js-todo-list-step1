import { makeElement } from "./utils.js";
import { setTodoStatus } from "./store.js";

const makeCheckBox = () => {
  const checkBox = makeElement("input", {
    className: "toggle",
    type: "checkbox",
  });
  checkBox.addEventListener("change", (e) =>
    setTodoStatus(key, e.target.checked ? "completed" : "none")
  );
  return checkBox;
};

const makeContent = () => {
  const contents = makeElement("div", { className: "view" });
  const checkBox = makeCheckBox();
  const label = makeElement("label", { className: "label" });
  const removeButton = makeElement("button", { className: "destroy" });

  contents.appendChild(checkBox);
  contents.appendChild(label);
  contents.appendChild(removeButton);

  return { contents, checkBox, label, removeButton };
};

const makeTemplateInfo = () => {
  const todo = makeElement("li");
  const { contents, checkBox, label, removeButton } = makeContent();
  const edit = makeElement("input", { className: "edit" });

  todo.appendChild(contents);
  todo.appendChild(edit);

  return { todo, checkBox, label, removeButton, edit };
};

const updateNode = (data) => {
  const { key, text, status, node } = data;
  const { todo, checkBox, label, removeButton, edit } = node;

  todo.className = status;
  checkBox.checked = status === "completed";
  label.innerHTML = text;
};

export const makeTodo = (data) => {
  if (!data.node) {
    data.node = makeTemplateInfo();
  }
  updateNode(data);
  return data.node.todo;
};
