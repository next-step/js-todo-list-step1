import { makeElement, setClassName } from "./utils.js";
import { setTodoStatus, removeTodo } from "./store.js";

const makeCheckBox = (key) => {
  const checkBox = makeElement("input", {
    className: "toggle",
    type: "checkbox",
  });
  checkBox.addEventListener("change", (e) =>
    setTodoStatus(key, e.target.checked ? "completed" : "none")
  );
  return checkBox;
};

const makeDeleteButton = (key) => {
  const button = makeElement("button", { className: "destroy" });
  button.addEventListener("click", (e) => removeTodo(key));
  return button;
};

const makeContent = (key) => {
  const contents = makeElement("div", { className: "view" });
  const checkBox = makeCheckBox(key);
  const label = makeElement("label", { className: "label" });
  const deleteButton = makeDeleteButton(key);

  contents.appendChild(checkBox);
  contents.appendChild(label);
  contents.appendChild(deleteButton);

  return { contents, checkBox, label, deleteButton };
};

const makeTemplateInfo = (key) => {
  const todo = makeElement("li");
  const { contents, checkBox, label, removeButton } = makeContent(key);
  const edit = makeElement("input", { className: "edit" });

  todo.appendChild(contents);
  todo.appendChild(edit);

  return { todo, checkBox, label, removeButton, edit };
};

const updateNode = (data) => {
  const { key, text, status, node } = data;
  const { todo, checkBox, label, removeButton, edit } = node;

  setClassName(todo)(status);
  checkBox.checked = status === "completed";
  label.innerHTML = text;
};

export const makeTodo = (data) => {
  if (!data.node) {
    data.node = makeTemplateInfo(data.key);
  }
  updateNode(data);
  return data.node.todo;
};
