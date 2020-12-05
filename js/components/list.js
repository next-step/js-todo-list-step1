import Task from './task.js';

const Folder = class extends Set{
  constructor (title, filter = 'all') {
    super();
    this.title = title;
    this.filter = filter;
  }

  static get(title){
    return new Folder(title);
  }

  static load(json){
    const folder = new Folder(json.title);
    json.tasks.forEach(t=>{
      folder.addTask(Task.load(t));
    });
    return folder;
  }

  toJSON(){
    return {title : this.title, tasks : this.getTasks()};
  }

  setFilter(filter){
    this.filter = filter;
  }

  getFilter(){
    return this.filter;
  }

  addTask(task){
    if(!(task instanceof Task)) return console.log('invalid task');
    super.add(task);
  }

  removeTask(task){
    if(!(task instanceof Task)) return console.log('invalid task');
    super.delete(task);
  }

  getTasks(){
    const tasks = [...super.values()];
    if(this.filter === 'active') return tasks.filter(todo => !todo.isCompleted);
    if(this.filter === 'completed') return tasks.filter(todo => todo.isCompleted);
    return tasks;
  }

  getTitle(){
    return this.title;
  }

  add(){};
  delete(){};
  clear(){};
  values(){};

}

export default Folder;
