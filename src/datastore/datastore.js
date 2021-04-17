/*
---Data Access Objects---
<Interface Description>
loadData : 데이터를 로드한다. 
saveData : 데이터를 저장한다.
*/

class LocalDataBase {
  static DB_NAME = "my-todo-list";
  static loadData() {
    return JSON.parse(localStorage.getItem(LocalDataBase.DB_NAME));
  }
  static saveData(arrayLike) {
    localStorage.setItem(LocalDataBase.DB_NAME, JSON.stringify(arrayLike));
  }
}

export { LocalDataBase as DAO };
