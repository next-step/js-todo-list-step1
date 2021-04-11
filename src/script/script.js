const addItem = document.getElementById('new-todo-title');
const todoList = document.getElementById('todo-list');

//1. todo list에 todoItem을 키보드로 입력하여 추가하기
addItem.addEventListener('keyup', function(e) {
    if(e.key === 'Enter' && '' != addItem.value) {
        todoList.innerHTML += '<li ondblclick="onEditItemHandler(this);">'
                            + '<div class="view">'
                            + '<input class="toggle" type="checkbox" onclick="onCheckItemHandler(this);"/>'
                            + '<label class="label">' + addItem.value + '</label>'
                            + '<button class="destroy" onclick="onDelItemHandler(this);"></button>'
                            + '</div>'
                            + '<input class="edit" value="' + addItem.value + '" />'
                            + '</li>';
        addItem.value = '';
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
}

//4. todo list를 더블클릭했을 때 input 모드로 변경 
// (li tag 에 editing class 추가) 
// 단, 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀
function onEditItemHandler(editItem) {
    console.log('ddd');
    editItem.className += "editing";
}