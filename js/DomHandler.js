const titleInput = document.getElementById("new-todo-title");
const list = document.getElementById("todo-list");

const countEl = document.getElementsByClassName("todo-count")[0].children[0];
let count = Number(
  document.getElementsByClassName("todo-count")[0].children[0].innerText
);

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
  li.addEventListener("dblclick", () => {
    if (li.classList.value === "") {
      li.classList.add("editing");
    }
  });

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
    --count;
    countEl.innerText = count;
  });

  const editEl = new DOMelement("input").addProperties("edit", {
    attributeKey: "value",
    attributeValue: title,
  });
  editEl.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      li.classList.remove("editing");
    } else if (event.key === "Enter") {
      labelEl.innerText = editEl.value;
      title = editEl.value;
      li.classList.remove("editing");
    }
  });

  viewEl.appendChild(toggleEl);
  viewEl.appendChild(labelEl);
  viewEl.appendChild(destroyEl);
  li.appendChild(viewEl);
  li.appendChild(editEl);

  return li;
};

titleInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const inputValue = titleInput.value;
    if (inputValue === "") return;
    list.appendChild(todoItem(inputValue));
    titleInput.value = "";
    ++count;
    countEl.innerText = count;
  }
});
