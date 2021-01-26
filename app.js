//실제 todo list 내용들이 저장되는 배열
const todoList = [];

const $todoInput = document.querySelector("#new-todo-title"); // 할 일 입력칸인 input태그 요소
const $todoList = document.querySelector("#todo-list"); // todo list 목록들이 담길 ul태그 요소
const $todoCount = document.querySelector(".todo-count"); // 총 ?개를 나타내는 span태그 요소

const $viewAllList = document.querySelector('.all'); // '전체보기' 버튼
const $viewTodoList = document.querySelector('.active'); //'해야할 일' 버튼
const $viewDoneList = document.querySelector('.completed'); //'완료한 일' 버튼

todoListRender();

function todoListRender() {
    // todoList 배열에 담긴 목록 정보를 ul태그 내에 뿌려줌
    $todoList.innerHTML = todoList.map(({ id, contents, completed, checked }) => (
        `
          <li data-id=${id} class=${completed}>
              <div class="view">
                  <input class="toggle" type="checkbox" ${checked}/>
                  <label class="label">${contents}</label>
                  <button class="destroy"></button>
                  </div>
            <input class="edit" value=${contents} />
          </li>
        `)
      ).join('');
      
    // todo list의 총 item 갯수 표시
    const length = todoList.length;
    $todoCount.innerHTML = `총 <strong>${length}</strong> 개`;
}

// 사용자가 입력창에서 enter를 누를 때 동작
$todoInput.addEventListener('keyup', ({ target, key }) => {
    const contents = target.value;

    // 눌린 키가 엔터가 아니거나 입력된 내용이 공백밖에 없으면 리턴
    if (key !== "Enter" || !contents.trim()) return;

    const id = newGuid(); // id 부여 (하단 newGuid() 함수 참고)
    const completed = '';
    const checked = '';
    
    todoList.push({ id, contents, completed, checked}); // 배열에 목록 정보 추가
    target.value = ''; // 입력창 초기화

    todoListRender(); // 목록 render
})

// 체크박스 클릭시 동작하는 이벤트 핸들러
$todoList.addEventListener('click', ({target}) => {
    // 클릭된 요소가 체크박스가 아니면 리턴
    if (target.className !== 'toggle') return;
    
    // 가장 가까운 li 부모요소 찾기
    const $li = target.closest('li');
    const { id } = $li.dataset; // li요소에서 id 정보 가져오기

    const idx = todoList.findIndex((todo) => todo.id === id); // 배열에서 해당 id를 가진 목록정보의 인덱스 찾아 idx에 저장
    const completed = todoList[idx].completed; 
    const checked = todoList[idx].checked;
    
    todoList[idx].completed = completed ? '' : 'completed';
    todoList[idx].checked = checked ? '' : 'checked';
    $li.className = completed ? '' : 'completed';
    
})

// x 버튼 클릭시 이벤트 핸들러
$todoList.addEventListener('click', ({target}) => {
    // 클릭된 요소가 x 버튼이 아니면 리턴
    if(target.className !== 'destroy') return;

    // 가장 가까운 li 부모요소 찾기
    const $li = target.closest('li');
    const { id } = $li.dataset;

    const idx = todoList.findIndex((todo) => todo.id === id);

    // confirm 확인창에서 취소누르면 리턴
    if(!confirm('정말로 삭제하시겠습니까?')) return;

    todoList.splice(idx, 1); // 해당 요소 삭제

    todoListRender(); // todoList 다시 불러오기
});

// 더블클릭시 수정모드로 전환
$todoList.addEventListener('dblclick', ({target}) => {
    if(target.className !== 'label') return;
    
    // 이미 수정하려고 더블클릭한 요소가 있었다면 자동 해제시킴
    cancelEditMode();

    const { id } = target.dataset;

    // 수정하는 화면으로 모습을 바꿈
    let $li = target.closest('li');
    $li.classList.toggle('editing');
    $childLabel = $li.querySelector('.edit');
    $childLabel.focus();
});

function cancelEditMode(){
    $todoList.querySelectorAll('li').forEach($item =>{
        if($item.classList.contains('editing')){
            $item.classList.toggle('editing');
        }
    });
}

$todoList.addEventListener('keyup', ({target, key}) => {
    if(key == 'Escape'){ // esc키를 눌렀을 때
        cancelEditMode();
        todoListRender(); // 로딩 안 하면 esc누르기 전에 작성된 내용이 더블클릭할시 다시 나타남
        return;
    }
    if(key == 'Enter'){ // enter키를 눌렀을 때
        const contents = target.value;
        // 공백검사 필요
        if(!contents.trim()){
            alert('내용을 입력해주세요.');
            return;
        }
        const $li = target.closest('li');
        const { id } = $li.dataset;
        const idx = todoList.findIndex((todo) => todo.id === id);
        todoList[idx].contents = contents;
        todoListRender();
    }
});

// '전체보기' 버튼을 눌렀을 때
$viewAllList.addEventListener('click', () => {
    $viewAllList.classList.add('selected');
    $viewTodoList.classList.remove('selected');
    $viewDoneList.classList.remove('selected');
    todoListRender();
})

// '해야할 일' 버튼을 눌렀을 때
$viewTodoList.addEventListener('click', () => {
    $viewTodoList.classList.add('selected');
    $viewAllList.classList.remove('selected');
    $viewDoneList.classList.remove('selected');

    $todoList.querySelectorAll('li').forEach($item =>{
        if(!$item.classList.contains('completed')){
            $item.style.display = 'block';
        }
        else{
            $item.style.display = 'none';
        }
    });
});

// '완료한 일' 버튼을 눌렀을 때
$viewDoneList.addEventListener('click', () => {
    $viewDoneList.classList.add('selected');
    $viewTodoList.classList.remove('selected');
    $viewAllList.classList.remove('selected');

    $todoList.querySelectorAll('li').forEach($item =>{
        if($item.classList.contains('completed')){
            $item.style.display = 'block';
        }
        else{
            $item.style.display = 'none';
        }
    });
});

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