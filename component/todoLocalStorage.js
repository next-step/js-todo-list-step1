import { toDos } from "../init.js";
import { addToDos, addToItems } from "./todoList.js";

const TODOS_LS = "toDos";

const saveToDos = () => {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

const loadToDos = () => {
  const loadedToDos = localStorage.getItem(TODOS_LS);

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo) => {
      addToDos(toDo);
      addToItems(toDo);
    });
  }
};

export { saveToDos, loadToDos };
