/*할일 
1. local의 값 불러오기 : html을 넣는건 어떨까? -> 다른 방법으로 해결 
2. 저장됐던 순서와 새로고침 한 이후의 순서가 같으려면?
3. 완료한 일은 새로고침 한 후에도 완료로 나오게. -> 해결
4. edit함수 view모드로 변경하는 부분
6. 해야할 일 page에서 completed적용 하면 update되도록. 반대도 마찬가지로 작동
*/

const $todoInput = document.querySelector("#new-todo-title");
const $toggleInput = document.getElementById("todo-list"); //수정 부분
const $filterInput = document.querySelector(".filters");

//value는 filter를 위해서 active, completed
//로컬storage에서 불러오기 : for문을 아용하여 localstorage를 모두 탐색. ul부분에 li로 삽입한다. 
for (let i=0; i< localStorage.length; i++){
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);

  $toggleInput.insertAdjacentHTML("beforeend", renderTodoItemTemplate(key));
  //완료한 일은 체크되어 나오도록한다. - 미완
  if(value == 'completed'){
    document.getElementById(key).classList.toggle("completed");
  }

}
//checkbox도 checked 표시
var completeds = $toggleInput.querySelectorAll(".completed");
for (let i=0; i< completeds.length; i++){
  completeds[i].querySelector(".toggle").checked = true;
}

document.querySelector("strong").innerHTML = localStorage.length;

//이벤트 추가
$todoInput.addEventListener("keyup", onAddTodoItem); 
$toggleInput.addEventListener("click", onToggleTodoItem);
$toggleInput.addEventListener("dblclick", onEditTodoItem);
$filterInput.addEventListener("click", onFilterItem);


//할 일 추가
function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  const todoList = document.getElementById("todo-list");
  if (event.key === "Enter" && todoTitle !== "") {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));

    //로컬에 저장
    localStorage.setItem(todoTitle, 'active');

    event.target.value = "";

    document.querySelector("strong").innerHTML = localStorage.length;
  }
}

//완료한 일로 check, 할 일 삭제 
function onToggleTodoItem(event) {
  //완료된 일
  if(event.target && event.target.nodeName === 'INPUT'){ 
    const $closestList = event.target.closest("li");
    $closestList.classList.toggle("completed");

    //active / completed를 local에 반영
    if($closestList.className === "completed"){
      localStorage.setItem($closestList.getAttribute('id'), 'completed');
    }else{
      localStorage.setItem($closestList.getAttribute('id'), 'active');
    }

  }
  //삭제
  if(event.target && event.target.nodeName === 'BUTTON'){
    var returnValue = confirm('정말로 삭제하시겠습니까?');
    if(returnValue === true){
      var header = event.target.closest("li");
      localStorage.removeItem(header.getAttribute('id')); //로컬에서 삭제
      header.parentNode.removeChild(header);

      document.querySelector("strong").innerHTML = localStorage.length;
    }
  }
}

function renderTodoItemTemplate(title) {
  return ` <li id='${title}'>
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="${title}">
              </li>`;
}

function editTodoItemTemplate(title) {
  return ` 
          <div class="view">
              <input class="toggle" type="checkbox">
              <label class="label">${title}</label>
              <button class="destroy"></button>
          </div>
          <input class="edit" value="${title}">
              `;
}


//할 일 수정
function onEditTodoItem(event){

  if(event.target && event.target.nodeName === 'LABEL'){ //수정 부분
    //edit 모드로 변경
    event.target.closest("li").classList .toggle("editing");

    const $editInput = document.querySelector(".edit");
    const $editList = document.querySelector("li");


    //수정한 후 로컬 key값도 수정해야한다. 
    $editInput.addEventListener("keyup", function(e){
        const editTitle = e.target.value;
 
        if (e.key == "Enter" && editTitle !== ""){
          //view 모드로 복귀 : li의 class를 수정 전 상태로 돌린다. "completed" or "" 
          $editInput.parentNode.className = ""; // or "completed"

          //list의 html 변경
          $editList.id = editTitle; //list의 id값 변경
          $editList.innerHTML = editTodoItemTemplate(editTitle);

          //로컬 key 수정
          // console.log($toggleInput.querySelector("li"));
          // console.log(getIndex($toggleInput.querySelector("li")));
        }
    });

  }
}

//클릭한 상태의 아이템만 보여주기
function onFilterItem(event){

  if(event.target){

    var aTags = $filterInput.querySelectorAll('a');
    var idx = 0;

    //전체보기
    if(event.target.className === 'all'){
      
      aTags[0].className = 'all selected';
      aTags[1].className = 'active';
      aTags[2].className = 'completed';

      for (let i=0; i< localStorage.length; i++){
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        document.getElementById(key).style.display = "block";
      
      }
      document.querySelector("strong").innerHTML = localStorage.length;
    }

    //해야할 일
    if(event.target.className === 'active selected' || event.target.className === 'active'){
      idx = 0;

      //css적용 : 형제 li에서 all selected or completed selected 이면 모두 select 제거한다.\
      aTags[0].className = 'all';
      aTags[1].className = 'active selected';
      aTags[2].className = 'completed';

      for (let i=0; i< localStorage.length; i++){
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        //해야할 일만 보이도록 display
        if(value === 'completed'){
          document.getElementById(key).style.display = "none";
        }else{
          document.getElementById(key).style.display = "block";
          idx += 1;
        }
  
      }
      document.querySelector("strong").innerHTML = idx;

    }

    //완료한 일
    if(event.target.className === 'completed'){
      idx = 0;

      //css적용 : 
      aTags[0].className = 'all';
      aTags[1].className = 'active';
      aTags[2].className = 'completed selected';

      for (let i=0; i< localStorage.length; i++){
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        if(value === 'active'){
          document.getElementById(key).style.display = "none";
        }else{
          document.getElementById(key).style.display = "block";
          idx += 1;
        }
  
      }
      document.querySelector("strong").innerHTML = idx;
  
  }
  }

}


//몇번째 요소인지 index 얻는 함수
function getIndex(ele) {
  var _i = 0;
  while((ele = ele.previousSibling) != null ) {
    _i++;
  }
  return _i;

}

