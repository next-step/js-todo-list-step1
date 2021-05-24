<h2 align="middle">JS 투두리스트 스텝1</h2>
<p align="middle">자바스크립트로 구현 하는 투두리스트</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <a href="https://github.com/next-step/js-todo-list-step1/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/next-step/js-todo-list-step1.svg?style=flat-square&label=license&color=08CE5D"/>
  </a>
</p>

# ☕️ 코드리뷰 모임 - Black Coffee

<br/>

> '훌륭한 의사소통은 블랙커피처럼 자극적이며, 후에 잠들기가 어렵다'. <br> A.M. 린드버그(미국의 작가, 수필가) -

<br/>

블랙커피처럼 서로를 자극해주고, 동기부여 해주며, 그 성장과정으로 인해 의미있는 가치를 만들어내고자 하는  
**프론트엔드 코드리뷰 모임** ☕️ **Black Coffee**입니다.

<br/>

## ☺️ 구현 결과 및 설명

![](https://i.imgur.com/B1vry5u.jpg)

### 1. 옵저버 패턴 (Observer Pattern) 사용

- Todo Data와 현재 사용자에게 보여질 TodoList의 종류(Status) 를 담은 객체를 발행자(Subject) **TodoStore** 로 등록
- TodoList 와 TodoCounter 컴포넌트, 즉 상태의 변화에 따라 리렌더링 해야하는 컴포넌트를 관찰자(Observer)로 등록
- TodoStore 에서 상태에 대한 변경이 있을 때 마다 관찰자들에게 notify 하여 관찰자들 내부의 update 메서드 실행 , update 메서드는 뷰를 리렌더링

### 2. TodoStore 내부 properties (state) / Method

- originData : 처음 localStorage (DataBase) 로부터 받아온 값을 저장, 즉 데이터의 원본을 저장
- renderData : Status 상태에 따라서 사용자에게 보여질 TodoData 저장 ( originData 로부터 필터링됨 )
- status : filter 항목에서 사용자가 선택한 상태 `all, active, complete`
- setOriginData : localStorage에 저장된 데이터베이스 변경 시 호출 (생성,삭제,업데이트 시)
- setRenderData : 현재 보여줄 RenderData 변경 시 호출 (status가 변경되었을 시), 호출 시 notify 를 호출하여 관찰자들에게 알려줌
- setStatus : filter 항목에서 사용자가 선택한 상태로 변경

<br/>

## 🎯 요구사항

- [x] todo list에 todoItem을 키보드로 입력하여 추가하기
- [x] todo list의 체크박스를 클릭하여 complete 상태로 변경 (li tag 에 completed class 추가, input 태그에 checked 속성 추가)
- [x] todo list의 x버튼을 이용해서 해당 엘리먼트를 삭제
- [x] todo list를 더블클릭했을 때 input 모드로 변경 (li tag 에 editing class 추가) 단 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀
- [x] todo list의 item갯수를 count한 갯수를 리스트의 하단에 보여주기
- [x] todo list의 상태값을 확인하여, 해야할 일과, 완료한 일을 클릭하면 해당 상태의 아이템만 보여주기

## 🎯🎯 심화 요구사항

- [x] localStorage에 데이터를 저장하여, TodoItem의 CRUD를 반영하기. 따라서 새로고침하여도 저장된 데이터를 확인할 수 있어야 함

## 📝 License

This project is [MIT](https://github.com/next-step/js-todo-list-step1/blob/main/LICENSE) licensed.
