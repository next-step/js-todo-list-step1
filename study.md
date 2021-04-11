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

### js...
* https://ifuwanna.tistory.com/196
* https://stackoverflow.com/questions/9201471/how-to-add-boolean-attribute-using-javascript
* https://developer.mozilla.org/ko/docs/Web/API/Element/classList
* https://stickode.com/detail.html?no=846

### 템플릿
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

### 그 외
* https://silver0r.tistory.com/119
* https://stackoverflow.com/questions/3369593/how-to-detect-escape-key-press-with-pure-js-or-jquery