// 201110 페어 프로그래밍 중 은영언니가 알려주면서 짠 코드

const todoList = [];

const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");

todoListRender();

function todoListRender() {
    $todoList.innerHTML = todoList.map(({ id, contents }) => ( // 구조 분해 할당
        `
          <li data-id=${id}>
              <div class="view">
                  <input class="toggle" type="checkbox"/>
                  <label class="label">${contents}</label>
                  <button class="destroy"></button>
              </div>
              <input class="edit" value="새로운 타이틀" />
          </li>
        `)
      ).join('');
}

$todoInput.addEventListener('keyup', ({ target, key }) => {
    const contents = target.value;

    // Truthy or Falsy
    if (key !== "Enter" || !contents.trim()) return;

    const id = newGuid();
    const completed = false;
    
    todoList.push({ id, contents, completed });
    target.value = '';

    todoListRender();
})

$todoList.addEventListener('click', ({ target }) => {
    if (target.className !== 'toggle') return;

    const $li = target.closest('li');
    const { id } = $li.dataset;

    const idx = todoList.findIndex((todo) => todo.id === id);
    
    const completed = todoList[idx].completed; 

    $li.className = completed ? '' : 'completed';

    todoList[idx].completed = !completed;
})

// `<li>
//     <div class="view">
//       <input class="toggle" type="checkbox"/>
//       <label class="label">새로운 타이틀</label>
//       <button class="destroy"></button>
//     </div>
//     <input class="edit" value="새로운 타이틀" />
//   </li>
//   <li class="editing">
//     <div class="view">
//       <input class="toggle" type="checkbox" />
//       <label class="label">완료된 타이틀</label>
//       <button class="destroy"></button>
//     </div>
//     <input class="edit" value="완료된 타이틀" />
//   </li>
//   <li class="completed">
//     <div class="view">
//       <input class="toggle" type="checkbox" checked/>
//       <label class="label">완료된 타이틀</label>
//       <button class="destroy"></button>
//     </div>
//     <input class="edit" value="완료된 타이틀" />
//   </li>`



function newGuid() {
    var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

    // c.f. rfc4122 (UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
    var oct = "", tmp;
    for (var a = 0; a < 4; a++) {
        tmp = (4294967296 * Math.random()) | 0;
        oct += hexValues[tmp & 0xF] + hexValues[tmp >> 4 & 0xF] + hexValues[tmp >> 8 & 0xF] + hexValues[tmp >> 12 & 0xF] + hexValues[tmp >> 16 & 0xF] + hexValues[tmp >> 20 & 0xF] + hexValues[tmp >> 24 & 0xF] + hexValues[tmp >> 28 & 0xF];
    }

    // "Set the two most significant bits (bits 6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively"
    var clockSequenceHi = hexValues[8 + (Math.random() * 4) | 0];
    return oct.substr(0, 8) + "-" + oct.substr(9, 4) + "-4" + oct.substr(13, 3) + "-" + clockSequenceHi + oct.substr(16, 3) + "-" + oct.substr(19, 12);
}