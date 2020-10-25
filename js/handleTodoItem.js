import { titleInput, list, countEl } from "./selectElement.js";
import DOMelement from "./createElement.js";
import { dispatch, subscribe, createIdx } from "./handleState.js";

titleInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const idx = createIdx();
    const inputValue = titleInput.value;
    const isCompleted = false;
    const initState = { idx, inputValue, isCompleted };
    if (inputValue === "") return;
    addStateToStore(initState);
    titleInput.value = "";
  }
});

const createTodoItem = (idx, title, isCompleted) => {
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

  if (isCompleted) {
    toggleEl.setAttribute("checked", "true");
    li.classList.add("completed");
  } else {
    toggleEl.removeAttribute("checked");
    li.classList.remove("completed");
  }

  const dispatchStoreByToggle = () => {
    const store = subscribe();
    const index = store.indexOf(store.find((item) => item.idx === idx));
    let isCompleted = store[index].isCompleted;
    store[index].isCompleted = !isCompleted;
    dispatch(store);
  };

  toggleEl.addEventListener("click", () => {
    if (toggleEl.getAttribute("checked")) {
      toggleEl.removeAttribute("checked");
      li.classList.remove("completed");
      dispatchStoreByToggle();
    } else {
      toggleEl.setAttribute("checked", "true");
      li.classList.add("completed");
      dispatchStoreByToggle();
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

const setStateAndDispatch = (store, initState) => {
  const { idx, inputValue: title, isCompleted } = initState;
  const todoItem = {
    idx,
    title,
    isCompleted,
  };
  store.push(todoItem);
  dispatch(store);
  render(subscribe());
};

const addStateToStore = (initState) => {
  if (subscribe()) {
    const store = subscribe();
    setStateAndDispatch(store, initState);
  } else {
    const store = [];
    setStateAndDispatch(store, initState);
  }
};

const updateCounter = () => {
  let counter = subscribe().length;
  countEl.innerText = counter;
};

const render = (store) => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  store.forEach((item) => {
    const { idx, title, isCompleted } = item;
    list.insertBefore(createTodoItem(idx, title, isCompleted), list.firstChild);
    updateCounter();
  });
};

if (subscribe()) {
  render(subscribe());
} else {
  render([]);
}
