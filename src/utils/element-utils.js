const makeElement = (tagName, options) => {
  const tag = document.createElement(tagName);

  Object.entries(options).forEach(([key, value]) => (tag[key] = value));

  return tag;
};

const getCompletedClassName = isCompleted => (isCompleted ? "completed" : "");

const makeListItem = completed =>
  makeElement("li", { className: getCompletedClassName(completed) });

const makeTodoView = id => {
  const todoView = makeElement("div", { className: "view" });
  todoView.dataset.index = id;

  return todoView;
};

const makeToggleButton = (completed, onToggle) => {
  const toggle = makeElement("input", {
    type: "checkbox",
    className: "toggle"
  });

  if (completed) {
    toggle.setAttribute("checked", completed);
  }

  toggle.addEventListener("click", onToggle);

  return toggle;
};

const makeTodoText = text =>
  makeElement("label", {
    className: "label",
    innerHTML: text
  });

const makeRemoveButton = onDestroy => {
  const button = makeElement("button", {
    className: "destroy",
    type: "button"
  });

  button.addEventListener("click", onDestroy);

  return button;
};

const makeEditInput = (id, text, listener) => {
  const editInput = makeElement("input", {
    className: "edit",
    value: text
  });

  editInput.dataset.index = id;

  editInput.addEventListener("keypress", listener);

  return editInput;
};

export const makeTodoItem = ({
  id,
  text,
  completed,
  onDestroy,
  onToggle,
  EditListener
}) => {
  const todoItem = makeListItem(completed);

  const todoView = makeTodoView(id);

  const toggleButton = makeToggleButton(completed, onToggle);

  const todoText = makeTodoText(text);

  todoText.addEventListener("dblclick", ({ target }) => {
    const list = target.closest("li");
    const input = list.querySelector(".edit");

    list.classList.add("editing");
    input.focus();
  });

  const removeButton = makeRemoveButton(onDestroy);

  const editInput = makeEditInput(id, text, EditListener);

  todoView.append(toggleButton, todoText, removeButton);

  todoItem.append(todoView, editInput);

  return todoItem;
};
