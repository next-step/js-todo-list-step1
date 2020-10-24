import {
  addClassName,
  makeElement,
  removeClassName,
  setClassName,
} from "./utils.js";
import { setTodoStatus, setTodoText, removeTodo } from "./store.js";

const makeCheckBox = (id) => {
  const checkBox = makeElement("input", {
    className: "toggle",
    type: "checkbox",
  });
  checkBox.addEventListener("change", (e) =>
    setTodoStatus(id, e.target.checked ? "completed" : "none")
  );
  return checkBox;
};

const makeDeleteButton = (id) => {
  const button = makeElement("button", { className: "destroy" });
  button.addEventListener("click", (e) => removeTodo(id));
  return button;
};

const makeContent = (id) => {
  const contents = makeElement("div", { className: "view" });
  const checkBox = makeCheckBox(id);
  const label = makeElement("label", { className: "label" });
  const deleteButton = makeDeleteButton(id);

  contents.appendChild(checkBox);
  contents.appendChild(label);
  contents.appendChild(deleteButton);

  return { contents, checkBox, label, deleteButton };
};

const setEditModeEvent = ({ label, todo, edit, id }) => {
  label.addEventListener("dblclick", () => {
    addClassName(todo)("editing");
    edit.focus();
  });
  edit.addEventListener("blur", () => {
    removeClassName(todo)("editing");
    edit.value = "";
  });
  edit.addEventListener("keyup", ({ key }) => {
    if (key === "Escape") {
      removeClassName(todo)("editing");
      edit.value = "";
    }
  });
  edit.addEventListener("keypress", ({ key }) => {
    if (key === "Enter") {
      setTodoText(id, edit.value);
      removeClassName(todo)("editing");
      edit.value = "";
    }
  });
};

const makeTemplateInfo = (id) => {
  const todo = makeElement("li");
  const { contents, checkBox, label, removeButton } = makeContent(id);
  const edit = makeElement("input", { className: "edit" });

  todo.appendChild(contents);
  todo.appendChild(edit);

  setEditModeEvent({ label, todo, edit, id });

  return { todo, checkBox, label, removeButton, edit };
};

const updateNode = (data) => {
  const { id, text, status, node } = data;
  const { todo, checkBox, label, removeButton, edit } = node;

  setClassName(todo)(status);
  checkBox.checked = status === "completed";
  label.innerHTML = text;
};

export const makeTodo = (data) => {
  if (!data.node) {
    data.node = makeTemplateInfo(data.id);
  }
  updateNode(data);
  return data.node.todo;
};
