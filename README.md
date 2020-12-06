# 🏴 첫번째 미션 - Todo List for Team!

## 🚀 기본 요구사항

- [X] todo list에 todoItem을 키보드로 입력하여 추가하기
- [X] todo list의 체크박스를 클릭하여 complete 상태로 변경. (li tag 에 completed class 추가, input 태그에 checked 속성 추가)
- [X] todo list의 x버튼을 이용해서 해당 엘리먼트를 삭제
- [X] todo list를 더블클릭했을 때 input 모드로 변경. (li tag 에 editing class 추가) 단 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀
- [X] todo list의 item갯수를 count한 갯수를 리스트의 하단에 보여주기
- [X] todo list의 상태값을 확인하여, 해야할 일과, 완료한 일을 클릭하면 해당 상태의 아이템만 보여주기

## 🚀🚀 심화 요구사항

- [ ] localStorage에 데이터를 저장하여, TodoItem의 CRUD를 반영하기. 따라서 새로고침하여도 저장된 데이터를 확인할 수 있어야 함

## 🗂 디렉토리 구조
```plaintext
├── LICENSE
├── README.md
├── package.json
├── package-lock.json
├── .gitignore
├── .prettierrc
├── .eslintrc.json
├── index.html
├── css
│   └── style.css
│
└── src
    ├── index.js // 이벤트리스너를 등록하는 메인 모듈
    │
    ├── event // Event와 관련된 모듈을 모아놓은 폴더
    │   ├── triggerKeyupEvent.js // keyup 이벤트를 받았을 때 실행하는 모듈
    │   ├── triggerClickEvent.js // 클릭 이벤트를 받았을 때 실행하는 모듈
    │   └── triggerDoubleClickEvent.js // 더블 클릭 이벤트를 받았을 때 실행하는 모듈  
    │
    └── todoList // todo list 조작과 관련된 모듈을 모아놓은 폴더
        ├── addTodoItem.js // 새로운 todo item을 추가하는 모듈
        ├── countTodoItem.js // 현재 화면의 todo item의 개수를 구해서 보여주는 모듈
        ├── setTodoItem.js // todo item의 상태를 변경하는 모듈
        └── setViewTodo.js // 현재 선택 된 카테고리에 따라 해당 카테고리에 맞는 todo item을 화면에 보여주는 모듈
```
