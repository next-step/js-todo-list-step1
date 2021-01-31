const $filter = document.querySelector(".filters");

export function initControlFilterButton(){
    $filter.addEventListener('click', controlFilterButton);
}

function controlFilterButton({target}){
    if(target.classList.contains('all') ) showAll();
    else if(target.classList.contains('active')) showActive();
    else if(target.classList.contains('completed')) showCompleted();
}

//button click : "전체보기" 
export function showAll(){
    const $todoList = document.querySelectorAll("#todo-list li");
    var idx = 0;

    for(let i=0; i<$todoList.length; i++){
        $todoList[i].style.display = "block";
        idx += 1;
    }
    setButton(0);
    document.querySelector("strong").innerText = idx;
}

//button click : 해야할 일"
export function showActive(){
    const $todoList = document.querySelectorAll("#todo-list li");
    var idx = 0;

    for(let i=0; i< $todoList.length; i++){
        if($todoList[i].classList.contains("completed")){
            $todoList[i].style.display = "none";
        }else{
            $todoList[i].style.display = "block";  
            idx += 1;
        }
    }
    setButton(1);
    document.querySelector("strong").innerText = idx;
}

//button click : "완료한 일" 
export function showCompleted(){
    const $todoList = document.querySelectorAll("#todo-list li");
    var idx = 0;

    for(let i=0; i< $todoList.length; i++){
        if($todoList[i].classList.contains("completed")) {
            $todoList[i].style.display = "block";
            idx += 1;
        }else{
            $todoList[i].style.display = "none";  
        }
    }
    setButton(2);
    document.querySelector("strong").innerText = idx;
}

//선택한 버튼만 표시 
function setButton(clickedBtnIdx){
    const aTags = $filter.querySelectorAll('a');
    for(let i=0; i<3; i++){
        aTags[i].classList.remove("selected");
    }
    aTags[clickedBtnIdx].classList.add("selected");
}


