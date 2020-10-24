import { titleInput, list, countEl, count } from "./selectElement.js";
import DOMelement from "./createElement.js";
import { dispatch, subscribe } from "./handleState.js";

let counter = count;

const createTodoItem = (idx, title) => {
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
    const store = subscribe();
    const index = store.indexOf(store.find((item) => item.idx === idx));
    store.splice(index, 1);
    dispatch(store);
    render(subscribe());
    if (store.length === 0) updateCounter();
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
      const store = subscribe();
      const index = store.indexOf(store.find((item) => item.idx === idx));
      store[index].title = editEl.value;
      dispatch(store);
      render(subscribe());
    }
  });

  viewEl.appendChild(toggleEl);
  viewEl.appendChild(labelEl);
  viewEl.appendChild(destroyEl);
  li.appendChild(viewEl);
  li.appendChild(editEl);

  return li;
};

const addTodo = (idx, title) => {
  if (subscribe()) {
    const store = subscribe();
    const todoItem = {
      idx,
      title,
    };
    store.push(todoItem);
    dispatch(store);
  } else {
    const store = [];
    const todoItem = {
      idx,
      title,
    };
    store.push(todoItem);
    dispatch(store);
  }
};

const updateCounter = () => {
  counter = subscribe().length;
  countEl.innerText = counter;
};

titleInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const idx = subscribe() ? subscribe().length : 0;
    const inputValue = titleInput.value;
    if (inputValue === "") return;
    addTodo(idx, inputValue);
    render(subscribe());
    titleInput.value = "";
  }
});

const render = (store) => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  store.forEach((item) => {
    const { idx, title } = item;
    list.insertBefore(createTodoItem(idx, title), list.firstChild);
    updateCounter();
  });
};

if (subscribe()) {
  render(subscribe());
} else {
  render([]);
}
