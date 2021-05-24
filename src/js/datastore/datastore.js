/*
---Data Access Objects---
<Interface Description>
loadData():array - 데이터를 로드한다. 
addItem(todoListArray,data):void - 할일을 추가한다.
deleteItem(index,todoListArray):void - 할일을 삭제한다.
updateItem(index, todoListArray, data):void - 할일을 변경한다.
updateItemState(index, todoListArray, state):void - 할일의 상태를 변경한다.
saveData(todoListArray):void - 데이터를 저장한다.
*/

export { LocalDataBase as DAO } from "./LocalDatabase.js";
