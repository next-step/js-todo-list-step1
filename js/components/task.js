const Task = class {
  constructor (title, isCompleted = false) {
    this.title = title;
    this.isCompleted = isCompleted;
  }

  static get(title){
    return new Task(title);
  }

  static load(json){
    const task = new Task(json.title, json.isCompleted);
    return task;
  }

  toJSON(){
    return this.getInfo();
  }

  setTitle(title){
    this.title = title;
  }

  toggle(){
    this.isCompleted = !this.isCompleted;
  }

  getInfo(){
    return {title : this.title, isCompleted : this.isCompleted};
  }
}
 export default Task;
