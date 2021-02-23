import {renewStrong} from './ControlTodoButton.js'
import {chooseButton} from './ControlTodoButton.js'

const todoList = document.getElementById("todo-list"); // 작성한 할 일이 삽입되는 ul 태그

export function initTodolistItems() {
  todoList.addEventListener("click", itemClickControl);
  todoList.addEventListener("dblclick", workContentCopy);
  todoList.addEventListener("keyup", workUpdate);
}

function itemClickControl({target}){
    if(target.classList.contains('toggle')) workCheck({target});
    else if(target.classList.contains('destroy')) workDelete({target});
  }
  
  
  function workCheck({target}) {
  
    // 등록된 항목들을 체크하거나 푸는 기능
    target.closest('li').classList.toggle("completed");
    
    if (target.checked) target.setAttribute("checked", "");
    else target.removeAttribute("checked");
    
    if (/(active)/.exec(window.location.href)) chooseButton('active');
    else if (/(completed)/.exec(window.location.href)) chooseButton('completed');
  }
  
  function workDelete({target}) {
    // 등록된 항목들을 제거하는 기능
    if (confirm("정말 삭제하시겠습니까?")) {
      const li = target.closest('li')
      li.parentNode.removeChild(li);
      renewStrong();
    }
  }
  
  function workContentCopy({target}) {
    // 등록된 항목의 수정을 위해 내용을 입력칸에 복사하는 기능
    const li = target.closest('li');
    li.classList.add("editing");
    const chginput = li.querySelector(".edit");
    chginput.value = target.innerText;
  }
  
  function workUpdate({target, key}) {
    // 등록된 항목을 수정하는 기능
    const li = target.closest('li');
    if (key === 'Escape') {
      li.classList.remove("editing");
      return;
    }
    if (key === 'Enter') {
      if (target.value !== "" && !/^\s+|\s+$/g.exec(target.value)) {
        let label = target.parentNode.querySelector(".label");
        label.innerText = target.value;
        target.value = "";
        li.classList.remove("editing");
      } else {
        alert("불필요한 공백을 제거해주세요!");
      }
    }
  }