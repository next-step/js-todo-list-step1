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
    setTodoStatus(id, e.target.checked ? "completed" : "active")
  );
  return checkBox;
};

const makeDeleteButton = (id) => {
  const button = makeElement("button", { className: "destroy" });
  button.addEventListener("click", () => removeTodo(id));
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

const enableEditMode = addClassName("editing");
const disableEditMode = (todo, edit) => {
  removeClassName("editing")(todo);
  edit.value = "";
};

const setEditModeEvent = ({ label, todo, edit, id }) => {
  label.addEventListener("dblclick", () => {
    enableEditMode(todo);
    edit.focus();
  });
  edit.addEventListener("blur", () => {
    disableEditMode(todo, edit);
  });
  edit.addEventListener("keyup", ({ key }) => {
    if (key === "Escape") {
      disableEditMode(todo, edit);
    }
  });
  edit.addEventListener("keypress", ({ key }) => {
    if (key === "Enter") {
      setTodoText(id, edit.value);
      disableEditMode(todo, edit);
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
  const { text, status, node } = data;
  const { todo, checkBox, label } = node;

  setClassName(todo, status);
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
