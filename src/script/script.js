const addItem = document.getElementById('new-todo-title');
const todoList = document.getElementById('todo-list');
const allBtn = document.querySelector('a.all');
const activeBtn = document.querySelector('a.active');
const completeBtn = document.querySelector('a.completed');

//1. todo list에 todoItem을 키보드로 입력하여 추가하기
addItem.addEventListener('keyup', function(e) {
    if(e.key === 'Enter' && '' != addItem.value) {
        todoList.innerHTML += '<li ondblclick="onEditItemHandler(this);">'
                            + '<div class="view">'
                            + '<input class="toggle" type="checkbox" onclick="onCheckItemHandler(this);"/>'
                            + '<label class="label">' + addItem.value + '</label>'
                            + '<button class="destroy" onclick="onDelItemHandler(this);"></button>'
                            + '</div>'
                            + '<input class="edit" value="' + addItem.value + '" onkeyup="onSaveEditHandler(this);"/>'
                            + '</li>';
        addItem.value = '';
        onChangeCountHandler();
    }
});

//2. todo list의 체크박스를 클릭하여 complete 상태로 변경
//(li tag 에 completed class 추가, input 태그에 checked 속성 추가)
function onCheckItemHandler(doneChk) {
    if(doneChk.checked) {
        doneChk.parentNode.parentNode.className += 'completed';
        doneChk.setAttribute('checked', true);

    } else {
        doneChk.parentNode.parentNode.className = '';
        doneChk.setAttribute('checked', false);
    }
}

//3.  todo list의 x버튼을 이용해서 해당 엘리먼트를 삭제
function onDelItemHandler(delBtn) {
    const delItem = delBtn.parentNode.parentNode;
    delItem.parentNode.removeChild(delItem);
    onChangeCountHandler();
}

//4. todo list를 더블클릭했을 때 input 모드로 변경 
// (li tag 에 editing class 추가) 
// 단, 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀
function onEditItemHandler(editItem) {
    editItem.className += "editing";
}

function onSaveEditHandler(editTxt) {
    const liTag = editTxt.parentNode;

    if(this.event.key === 'Enter') {
        liTag.querySelector(".label").innerHTML = editTxt.value;
        liTag.className = "";

    } else if(this.event.keyCode == 27) {
        editTxt.value = liTag.querySelector(".label").innerHTML;
        liTag.className = "";
    }
}

//5. todo list의 item갯수를 count한 갯수를 리스트의 하단에 보여주기
function onChangeCountHandler() {
    const count = document.querySelectorAll(".toggle").length;
    document.querySelector("strong").innerHTML = count;    
}

//6. todo list의 상태값을 확인하여, 해야할 일과, 완료한 일을 클릭하면 해당 상태의 아이템만 보여주기
allBtn.addEventListener('click', function() {
    allBtn.className = "all selected";
    activeBtn.className = "active";
    completeBtn.className = "completed";

    const allLi = todoList.querySelectorAll("li");
    for (let liTag of allLi) {
        liTag.style.display = "block";
    }

    onChangeCountHandler()
});

activeBtn.addEventListener('click', function() {
    allBtn.className = "all";
    activeBtn.className = "active selected";
    completeBtn.className = "completed";

    const allLi = todoList.querySelectorAll("li");
    let activeCount = 0;
    for (let liTag of allLi) {
        if(liTag.className === 'completed') {
            liTag.style.display = "none";
        } else {
            liTag.style.display = "block";
            activeCount += 1;
        }
    }

    const count = document.querySelectorAll(".toggle").length;
    document.querySelector("strong").innerHTML = activeCount;    
});

completeBtn.addEventListener('click', function() {
    allBtn.className = "all";
    activeBtn.className = "active";
    completeBtn.className = "completed selected";

    const allLi = todoList.querySelectorAll("li");
    let completeCount = 0;
    for (let liTag of allLi) {
        if(liTag.className === 'completed') {
            liTag.style.display = "block";
            completeCount += 1;
        } else {
            liTag.style.display = "none";
        }
    }

    const count = document.querySelectorAll(".toggle").length;
    document.querySelector("strong").innerHTML = completeCount;  
});