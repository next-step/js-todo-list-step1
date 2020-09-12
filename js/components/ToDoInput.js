import store from "../store/store.js";
export default {
    paintToDo, edited
}


function paintToDo(text,val){
    return `
    <li class=${val}>
      <div class="view">
        <input class="toggle" type="checkbox"/>
        <label class="label">${text}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${text}"/>
    </li>
  `;
}

function edited(text, li){
    const label = li.querySelector(".label");
    store.removetoDosObj(label.innerText);
    label.innerText = text;
    li.classList.remove("editing");
    store.PushTodo(text, li.className === "completed" ? 'checked' : 'unchecked');
    store.saveToDo();
}