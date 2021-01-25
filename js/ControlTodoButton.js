const viewAllList = document.querySelector(".all"); // 전체 보기 버튼
const viewTodoList = document.querySelector(".active"); // 해야할 일 보기 버튼
const viewCompleteList = document.querySelector(".completed"); // 완료한 일 보기 버튼
const filter = document.querySelector(".filters");

export function initTodolistButton(){
    filter.addEventListener("click", controlFilterButton);
}

function controlFilterButton({target}){
    if(target.classList.contains('all')) chooseButton('all');
    else if(target.classList.contains('active')) chooseButton('active');
    else if(target.classList.contains('completed')) chooseButton('completed');
}

export function chooseButton(button){
    if(button === 'all') viewAll();
    else if(button === 'active') viewTodo();
    else if(button === 'completed') viewDone();
}


function viewAll() {
  // "전체보기" 버튼 클릭 시의 기능
  let list = document.querySelectorAll("#todo-list>li");
  for (let i = 0; i < list.length; i++) {
    list[i].classList.add("selected");
  }
  changeBox(viewAllList);
  reflectView();
}

function viewTodo() {
  // "해야할 일" 버튼 클릭 시의 기능
  let list = document.querySelectorAll("#todo-list>li");

  for (let i = 0; i < list.length; i++) {
    if (list[i].querySelector(".toggle").hasAttribute("checked")) {
      list[i].classList.remove("selected");
    } else {
      list[i].classList.add("selected");
    }
  }
  changeBox(viewTodoList);
  reflectView();
}

function viewDone() {
  // "완료한 일" 버튼 클릭 시의 기능
  let list = document.querySelectorAll("#todo-list>li");
  for (let i = 0; i < list.length; i++) {
    if (!list[i].querySelector(".toggle").hasAttribute("checked")) {
      list[i].classList.remove("selected");
    } else {
      list[i].classList.add("selected");
    }
  }
  changeBox(viewCompleteList);
  reflectView();
}

function changeBox(box) {
  // 선택한 버튼을 표시하는 기능
  viewAllList.classList.remove("selected");
  viewTodoList.classList.remove("selected");
  viewCompleteList.classList.remove("selected");

  if (box.classList.contains("all")) {
    viewAllList.classList.add("selected");
  } else if (box.classList.contains("active")) {
    viewTodoList.classList.add("selected");
  } else if (box.classList.contains("completed")) {
    viewCompleteList.classList.add("selected");
  }
}

function reflectView() {
  // 현재 누른 버튼에 대한 뷰를 반영하는 기능
  let list = document.querySelectorAll("#todo-list>li");
  for (let i = 0; i < list.length; i++) {
    if (list[i].classList.contains("selected")) {
      list[i].style.display = "block";
    } else {
      list[i].style.display = "none";
    }
  }
  renewStrong();
}

export function renewStrong() {
    // 리스트 하단의 총 목록 갯수를 갱신하는 기능
    let list = document.querySelectorAll("#todo-list>li.selected");
    let item = document.querySelector("strong");
    item.innerText = list.length;
  }