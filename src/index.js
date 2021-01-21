let new_todo = document.getElementById('new-todo-title');
let answer;

new_todo.addEventListener("keyup", function(event) {
    // Enter키를 누를시 실행
    if (event.keyCode === 13) {
        answer = confirm('등록 하시겠습니까?') == true ? admin(new_todo.value) : false;
        //입력한 할일 추가시 할일 공백으로 만들기
        new_todo.value = '';
    }
});         // 내용을 입력하고 'Enter'를 누르면 comfirm이 나오고 맞다면 admin함수 실행

let count = 0 ;     //할 일 갯수 세는 용
let todo_count = document.querySelector('.todo-count');

// ul태그 추가
let ul = document.createElement('ul');
// main 태그를 기준으로 바로위에다가 ul 엘리먼트를 추가
document.querySelector('main').insertAdjacentElement("beforebegin", ul);

function admin(value) {
    //태그들과 class 속성 부여 후 연결

    let li = document.createElement('li');
    let div = document.createElement('div');
    let input = document.createElement('input');
    let button = document.createElement('button');
    let label = document.createElement('label');

    ul.append(li);
    li.append(div);
    div.append(input);
    div.append(label);
    div.append(button);

    ul.classList.add('todo');
    ul.setAttribute('id','todo');
    li.classList.add('active')
    div.classList.add('new-todo');
    input.classList.add('toggle');
    input.setAttribute('type', 'checkbox');
    label.classList.add(`label`);
    button.classList.add(`destroy${count++}`);

    //li앞에 문자 생략
    li.style.listStyleType = "None";
    //입력 값을 label에 추가 및 버튼에 X 추가
    label.innerHTML = value;
    button.innerHTML = 'X';

    //버튼 클릭시 가장가까운 li태그 삭제 및, 해야할 count 값 줄이기
    button.addEventListener('click', function (event) {
        event.target.closest('li').remove();
        todo_count.childNodes[1].innerHTML = --count;
    })

    // 체크박스 클릭시 li태그에 class속성 추가 및 text에 중간작대기 생성 (클릭 취소하면 class속성 completed 추가 및 text원래대로)
    // input의 부모태그 아래의 [1] 위치에 text가 존재하므로 이를 진행
    input.addEventListener('click', function (event) {
        if (input.checked == true) {
            event.target.closest('li').setAttribute('class','completed');
            event.target.parentNode.childNodes[1].style.textDecoration = 'line-through';
        } else {
            event.target.closest('li').setAttribute('class','active');
            event.target.parentNode.childNodes[1].style.textDecoration = 'none';
        }
    })

    //strong태그 안에 있는 count 값 적용시키기
    todo_count.childNodes[1].innerHTML = count;
}

//전체보기 버튼 클릭시 모든 내용 display
document.querySelector('.all').addEventListener('click',function(){
    let child = document.querySelector('.todo')
    child.childNodes.forEach(x=> x.style.display = '');
})

//해야할 일 버튼 클릭시 class가 completed인 것들은 display가 none이 되도록
document.querySelector('.active').addEventListener('click',function(){
    let child = document.querySelector('.todo')
    child.childNodes.forEach(x=>x.classList!='active' ? x.style.display = 'none' : x.style.display='')
})

//완료한 일 클릭시 class가 active인 것들은 display가 none이 되도록
document.querySelector('.completed').addEventListener('click',function(){
    let child = document.querySelector('.todo')
    child.childNodes.forEach(x=>x.classList!='completed' ? x.style.display = 'none' : x.style.display='')
})


