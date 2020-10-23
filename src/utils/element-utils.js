const makeElement = (tagName, options) => {
  const tag = document.createElement(tagName);

  Object.entries(options).forEach(([key, value]) => (tag[key] = value));

  return tag;
};

const getClassName = isCompleted => (isCompleted ? "completed" : "");

const makeListItem = completed =>
  makeElement("li", { className: getClassName(completed) });

const makeViewDiv = id => {
  const viewDiv = makeElement("div", { className: "view" });
  viewDiv.dataset.index = id;

  return viewDiv;
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

const makeLabel = text =>
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

export const makeLists = ({
  id,
  text,
  completed,
  onDestroy,
  onToggle,
  EditListener
}) => {
  const toDo = makeListItem(completed);

  const viewDiv = makeViewDiv(id);

  const toggle = makeToggleButton(completed, onToggle);

  const label = makeLabel(text);

  label.addEventListener("dblclick", ({ target }) => {
    const list = target.closest("li");
    const input = list.querySelector(".edit");

    list.classList.add("editing");
    input.focus();
  });

  const removeButton = makeRemoveButton(onDestroy);

  const editInput = makeEditInput(id, text, EditListener);

  viewDiv.appendChild(toggle);
  viewDiv.appendChild(label);
  viewDiv.appendChild(removeButton);

  toDo.appendChild(viewDiv);

  toDo.appendChild(editInput);

  return toDo;
};
