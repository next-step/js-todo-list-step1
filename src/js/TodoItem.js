function TodoItem(contents, id) {
  let Contents = contents;
  const Id = id;
  let Completed = false;
  let Editing = false;
  // ❓ function으로 만들면 (getter와 setter을 쓰지 않고도) 접근이 가능한데...
  // 어떻게 캡슐화? this와 const로 하나?
  // 아니면 class를 이용하는 것이 제일 좋은 방법일까?

  this.getId = () => {
    return this.Id;
  };

  this.getContents = () => {
    return this.Contents;
  };

  this.setContents = (contents) => {
    this.Contents = contents;
  };

  this.switchCompleted = () => {
    this.Completed = !this.Completed;
  };

  this.switchEditing = () => {
    this.Editing = !this.Editing;
  };
}

export default TodoItem;
