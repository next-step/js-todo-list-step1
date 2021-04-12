# study

### 미션 진행 과정
* 프로젝트 저장소를 자신의 계정으로 fork
* `git clone -b moon9ua --single-branch https://github.com/moon9ua/js-todo-list-step1.git`
* `git push origin moon9ua`
* moon9ua/js-togo-list-step1 저장소의 moon9ua 브랜치를, next-step/js-todo-list-step1의 moon9ua 브랜치로 pull request

### vscode extension
* Live Server
    * 설치 후, html 파일에서 오른 클릭으로 `open with live server`
* ESlint
* Prettier - Code formatter

### DOM
* https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction

### 그 외
* https://ifuwanna.tistory.com/196
* https://stackoverflow.com/questions/9201471/how-to-add-boolean-attribute-using-javascript
* https://developer.mozilla.org/ko/docs/Web/API/Element/classList
* https://stickode.com/detail.html?no=846
* https://silver0r.tistory.com/119
* https://stackoverflow.com/questions/3369593/how-to-detect-escape-key-press-with-pure-js-or-jquery

### 자바스크립트 요소 찾기
* https://jhmocu.tistory.com/102
* https://dydals5678.tistory.com/11
* https://itun.tistory.com/501
* http://daplus.net/javascript-%EC%9A%94%EC%86%8C%EC%97%90-javascript%EC%9D%98-%ED%81%B4%EB%9E%98%EC%8A%A4%EA%B0%80-%ED%8F%AC%ED%95%A8%EB%90%98%EC%96%B4-%EC%9E%88%EB%8A%94%EC%A7%80-%ED%99%95%EC%9D%B8-%ED%95%98%EC%8B%9C/
    > `elem.classList.contains(<class>)`

```
$0
<label class=​"label">​1​</label>​
const li = $0.closest('li');
undefined
li.style.display = 'none';
"none"
li.style.display = 'block';
"block"
li.style.visibility = 'hidden';
"hidden"
li.style.display = 'none';
"none"
li.style.display = 'block';
"block"
li.style.visibility = 'unhidden';
"unhidden"
li.style.visibility = 'visible';
"visible"
li.style.display = 'none';
"none"
li.style.display = 'block';
"block"
```