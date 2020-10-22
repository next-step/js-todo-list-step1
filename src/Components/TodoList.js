const getClassName = completed => (completed ? "class='completed'" : "");

const addList = ({ key, text, completed }) => `
    <li key={key} ${getClassName(completed)} >
        <div class="view" data-index="${key}">
          <input class="toggle" type="checkbox" ${completed ? " checked" : ""}/>
          <label class="label">${text}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${text}" data-index="${key}"/>
    </li>
`;

export default ({ todo: todoList }) => {
  const list = document.getElementById("todo-list");

  list.innerHTML = todoList.map(addList).join("");
};
