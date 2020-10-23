const makeElement = (tagName, options) => {
  const tag = document.createElement(tagName);

  Object.entries(options).forEach(([key, value]) => (tag[key] = value));

  return tag;
};

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

const getClassName = isCompleted => (isCompleted ? "completed" : "");

export const createListItem = ({
  id,
  text,
  completed,
  onDestroy,
  onToggle
}) => {
  const toDo = makeListItem(completed);

  const viewDiv = makeViewDiv(id);

  const toggle = makeToggleButton(completed, onToggle);

  const label = makeLabel(text);

  const removeButton = makeRemoveButton(onDestroy);

  viewDiv.appendChild(toggle);
  viewDiv.appendChild(label);
  viewDiv.appendChild(removeButton);

  toDo.appendChild(viewDiv);

  return toDo;
};
