export const todoItemTemplate = (data) =>
  `<li data-id="${data.id}" class="todo-item ${data.isDone ? 'completed' : ''}">
    <div class="view">
      <input class="toggle" type="checkbox" ${data.isDone ? 'checked' : ''}/>
      <label class="label">${data.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${data.title}" />
  </li>`;

export const todoFilterTemplate = (data) =>
  `<span class="todo-count">총 <strong>${data.count}</strong> 개</span>
  <ul id="filters" class="filters">
    <li>
      <a class="all ${data.filter === 'all' ? 'selected' : ''}" href="/#">전체보기</a>
    </li>
    <li>
      <a class="active ${data.filter === 'active' ? 'selected' : ''}" href="#active">해야할 일</a>
    </li>
    <li>
      <a class="completed ${data.filter === 'completed' ? 'selected' : ''}" href="#completed">완료한 일</a>
    </li>
  </ul>`;
