import {removetoDosObj, saveToDo, PushTodo}from "../store/store.js";
export  {
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
    removetoDosObj(label.innerText);
    label.innerText = text;
    li.classList.remove("editing");
    PushTodo(text, li.className === "completed" ? 'checked' : 'unchecked');
    saveToDo();
}