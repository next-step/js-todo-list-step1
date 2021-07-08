//prettier-ignore
import { TOGGLE, DESTORY, DELETE, EDITING, ENTER, ESCAPE } from "./constant.js";
import { buildNewState, filterTodos } from "../../utils/helpers.js";
import { isInClassList } from "../../utils/selectors.js";

export function addsEventListener($app, store) {
  $app.addEventListener("keydown", (e) => updateTodoInput(e, store));
  $app.addEventListener("click", (e) => toggleItem(e, store));
  $app.addEventListener("dblclick", (e) => setEditingMode(e));
}
export function buildListTodos(store) {
  const { todos, view } = store.getState();
  return view === "all" ? todos : filterTodos(todos, view);
}

function toggleItem(e, store) {
  const isToggle = isInClassList(TOGGLE, e.target);
  const isDestroy = isInClassList(DESTORY, e.target);
  if (isToggle || isDestroy) {
    const op = isToggle ? TOGGLE : DELETE;
    buildNewState(op, store, e);
  }
}
function setEditingMode(e) {
  const isList = e.target.closest("li");
  if (isList) {
    isList.classList.add(EDITING);
  }
}
function updateTodoInput(e, store) {
  const isEditing = isInClassList(EDIT, e.target);
  if (isEditing && e.key === ENTER) {
    buildNewState(EDIT, store, e);
    e.target.closest("li").classList.remove(EDITING);
  }
  if (isEditing && e.key === ESCAPE) {
    const currentValue = $(".label").textContent;
    e.target.value = currentValue;
    e.target.closest("li").classList.remove(EDITING);
  }
}
