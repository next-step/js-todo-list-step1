/* 1. todo list에 todoItem을 키보드로 입력하여 추가하기 */ 
function addItem() {
    //  enter키 동작 시 inputText 받아오기 

    const $inputText = document.getElementById('new-todo-title').value;

    // todo-list 추가
    let $ul = document.getElementById('todo-list');
    let $li = document.createElement("li");

    let $liText = document.createTextNode($inputText);
    $li.appendChild($liText);
    $ul.appendChild($li);

}