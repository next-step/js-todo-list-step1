# todo list

## 작업한 일 순서 
  1. README.md 파일에서 요구하는 기본 기능 파악하기 
    - CRUD 기능, item count, item filter 기능 
  2. javascript 파일 삽입
  3. HTML 구조 분석 
``css
.todoapp
  - .new-todo
  - main
    - .toggle-all // todo항목 전체선택 기능
    - .todo-list // todo항목 나열 되는 부분 
    - .count-container // wrapper
      - .todo-count // 해당 필터별 
      - .filters // 필터 목록 부분
        - .all
        - .active
        - .completed
        - .selected // 선택된 경우 활성화
``

  4. .todo-list안에 들어갈 item 컴포넌트 작성 (완료버튼, 내용, 삭제버튼)
  5. 필요한 이벤트 목록 정리 
    - DOM이 다 불려지면 이벤트 할당하는 초기화 진입점 
      - .new-todo enter event 
      - .new-todo click event 
      - .filters click event 
      - .todo-count click (done)
      - .todo-count click (delete)
      - .todo-count double-click (edit)
      - .todo-count keyevent-ESC (cancel)
  6. 작성할 로직
    - item filter rendering
    - item filter count
    - localStorage SET (어느 이벤트에서 발생을 하게 할 것인가?) 
    - localStorage GET
    - 5번에 적어 놓은 이벤의 함수 
  7. 데이터 저장 형식 
    - 완료여부 / 본문 / ID
    