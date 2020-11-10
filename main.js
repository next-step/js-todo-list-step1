// class todo{
//     constructor(todo){
        
//     }
// }

// function TodoApp(){
//     const $todoList = document.querySelector('todo-list');
//     this.todoItems = [];

//     this.setState
// }

// live-server 깔기

// type="module" 로 script 불러오면 defer로 불러온대(근데 브라우저에서 허용하는 범위가 적대 그래서 현실적으론 body 아래에 놓는대)

// can i use 사이트 - 브라우저 에서 허용하는거 알려주는, 검색할 수 있는

// event target? 

// uuid - unique 값을 만들어주는 라이브러리

// map
// 매핑한다.

// keyed id 
// redux nomalize
// `const todoList` 관련 이슈
// 현업에선 redux nomalize 많이 쓴대

// 코드 클린업하면서 작성하는게 좋음
// 부분부분 비슷한걸로 모아놓고

// 공백이 있는 문자열은 '    '
// truthy한 값
//!이 변수 -> false

// ''
// falsy한 값
let list = document.getElementById('todo-list');
let input = document.querySelector('#new-todo-title');

input.addEventListener("keydown", function(e){
    if(e.keyCode == 13){ // enter key
        // code for enter
        let li = document.createElement('li');
        //console.dir(li);
        li.innerHTML = input.value;
        list.appendChild(li);
    }
});

