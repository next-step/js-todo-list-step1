const titleInput = document.getElementById("new-todo-title");
const list = document.getElementById("todo-list");

const createDOMElement = (tag) => {
  return document.createElement(tag);
};

const addClassName = (element, className) => {
  element.className = className;
  return element;
};

const addAttribute = (element, attribute, attributeValue) => {
  element.setAttribute(attribute, attributeValue);
  return element;
};

const todoItem = (title) => {
  const li = createDOMElement("li");
  const viewEl = addClassName(createDOMElement("div"), "view");
  const toggleEl = addAttribute(
    addClassName(createDOMElement("input"), "toggle"),
    "type",
    "checkbox"
  );
  const labelEl = addClassName(createDOMElement("label"), "label");
  labelEl.innerText = title;
  const destroyEl = addClassName(createDOMElement("button"), "destroy");
  const editEl = addAttribute(
    addClassName(createDOMElement("input"), "edit"),
    "value",
    "새로운 타이틀"
  );

  viewEl.appendChild(toggleEl);
  viewEl.appendChild(labelEl);
  viewEl.appendChild(destroyEl);
  li.appendChild(viewEl);
  li.appendChild(editEl);

  return li;
};

titleInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const inputValue = titleInput.value;
    if (inputValue === "") return;
    list.appendChild(todoItem(inputValue));
    titleInput.value = "";
  }
});
