## 🎯 요구사항 <hr/>

✅ todo list에 todoItem을 키보드로 입력하여 추가하기<br>

✅ todo list의 체크박스를 클릭하여 complete 상태로 변경. (li tag 에 completed class 추가, input 태그에 checked 속성 추가).<br>

✅ todo list의 x버튼을 이용해서 해당 엘리먼트를 삭제<br>

⬜ todo list를 더블클릭했을 때 input 모드로 변경. (li tag 에 editing class 추가) 단 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀<br>

✅ todo list의 item갯수를 count한 갯수를 리스트의 하단에 보여주기

⬜ todo list의 상태값을 확인하여, 해야할 일과, 완료한 일을 클릭하면 해당 상태의 아이템만 보여주기

## 🎯🎯 심화 요구사항 <hr/>

✅ localStorage에 데이터를 저장하여, TodoItem의 CRUD를 반영하기. 따라서 새로고침하여도 저장된 데이터를 확인할 수 있어야 함

## 🙏 코멘트 <hr/>

#### 문제사항

- todo list의 첫번째 항목만 line-through가 적용되고, x 버튼기능이 제대로 작동하는 문제점이 있습니다. 제 개인적인 생각으로는 querySelector로 해당 element를 부른 것이 문제라고 생각하는데요. 해당 부분에 대한 자료나 의견 주시면 감사하겠습니다.

- toggle 기능을 완수하지 못했습니다.

#### 2회차 온라인 회의 회고에 대하여...

다른 분들의 코드를 통해 시야를 넓히는 유익한 시간이었습니다. 애자일 방법론에 대해 언급해주신 동준님 덕분에 아직 부족한 코드이지만 용기를 내 올려봅니다. 나머지 기능에 대해서는 스터디 자료 활용하여 더 채워나가겠습니다.
