function TodoItem(contents, id) {
  const Id = id;
  let Contents = contents;
  let Completed = false;
  let Editing = false;

  // ❓ function으로 만들면 (getter와 setter을 쓰지 않고도) 접근이 가능한데...
  // 어떻게 캡슐화? this와 const로 하나?

  // ❓ 아니면 class를 이용하는 것이 제일 좋은 방법일까?

  this.getId = () => {
    return Id;
  };

  this.getContents = () => {
    return Contents;
  };

  this.setContents = (contents) => {
    Contents = contents;
  };

  this.getCompleted = () => {
    return Completed;
  };

  this.switchCompleted = () => {
    Completed = !Completed;
  };

  this.getEditing = () => {
    return Editing;
  };

  this.switchEditing = () => {
    Editing = !Editing;
  };
}

export default TodoItem;
