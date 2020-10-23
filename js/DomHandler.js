const titleInput = document.getElementById("new-todo-title");
const list = document.getElementById("todo-list");

class DOMelement {
  constructor(tag) {
    this.element = document.createElement(tag);
  }

  addProperties = (className, attrProps) => {
    this.element.className = className;
    if (attrProps) {
      this.element.setAttribute(
        attrProps.attributeKey,
        attrProps.attributeValue
      );
      return this.element;
    }
    return this.element;
  };
}

const todoItem = (title) => {
  const li = new DOMelement("li").element;
  const viewEl = new DOMelement("div").addProperties("view");

  const toggleEl = new DOMelement("input").addProperties("toggle", {
    attributeKey: "type",
    attributeValue: "checkbox",
  });
  toggleEl.addEventListener("click", () => {
    if (!toggleEl.getAttribute("checked")) {
      toggleEl.setAttribute("checked", "true");
      li.classList.add("completed");
    } else {
      toggleEl.removeAttribute("checked");
      li.classList.remove("completed");
    }
  });

  const labelEl = new DOMelement("label").addProperties("label");
  labelEl.innerText = title;

  const destroyEl = new DOMelement("button").addProperties("destroy");
  destroyEl.addEventListener("click", () => {
    li.remove();
  });

  const editEl = new DOMelement("input").addProperties("edit", {
    attributeKey: "value",
    attributeValue: "새로운 타이틀",
  });

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
