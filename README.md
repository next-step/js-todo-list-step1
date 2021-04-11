
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

<br/>
## 🔔 참고사항
`TodoItem`을 추가할 시 아래 템플릿을 활용하면 됩니다.
```html
<ul id="todo-list" class="todo-list">
  <li>
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">새로운 타이틀</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  </li>
  <li class="editing">
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label class="label">완료된 타이틀</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="완료된 타이틀" />
  </li>
  <li class="completed">
    <div class="view">
      <input class="toggle" type="checkbox" checked/>
      <label class="label">완료된 타이틀</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="완료된 타이틀" />
  </li>
</ul>
```

<br/>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br/>

## 💻 Code Review
아래 링크들에 있는 리뷰 가이드를 보고, 좋은 코드 리뷰 문화를 만들어 나가려고 합니다.  
- [코드리뷰 가이드1](https://edykim.com/ko/post/code-review-guide/)
- [코드리뷰 가이드2](https://wiki.lucashan.space/code-review/01.intro.html#_1-code%EB%A5%BC-%EB%A6%AC%EB%B7%B0%ED%95%98%EB%8A%94-%EC%82%AC%EB%9E%8C%EB%93%A4%EC%9D%80-%EC%96%B4%EB%96%A4%EA%B2%83%EC%9D%84-%EC%A4%91%EC%A0%90%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%82%B4%ED%8E%B4%EC%95%BC%ED%95%98%EB%8A%94%EA%B0%80)

<br/>

## 💬 1주차 미션 후기 블로그

아래 링크는 1주차 미션을 진행하면서 블로그를 작성해주신 분들의 글입니다. 미션을 진행하면서, 다른 분들의 문제 해결 과정이 궁금하다면 참고해주세요 😄
- [1주차 미션후기](https://www.notion.so/1-2-8b624729fbce4174b8b583efb10c3200)
- [블랙커피 프론트엔드 스터디 레벨1 후기](https://yujo11.github.io/%EB%B8%94%EB%9E%99%EC%BB%A4%ED%94%BC/%EB%B8%94%EB%9E%99%EC%BB%A4%ED%94%BC-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%8A%A4%ED%84%B0%EB%94%94-%EB%A0%88%EB%B2%A81-%ED%9B%84%EA%B8%B0/)

<br/>

## 👏🏼 Contributing

만약 미션 수행 중에 개선사항이 필요하다면, 언제든 자유롭게 PR을 보내주세요.

<br/>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/next-step/js-todo-list-step1/issues)에 등록해주세요.

<br/>

## 📝 License

This project is [MIT](https://github.com/next-step/js-todo-list-step1/blob/main/LICENSE) licensed.
