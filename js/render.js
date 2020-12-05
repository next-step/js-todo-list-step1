import App from './components/app.js';
import Folder from './components/list.js';
import Task from './components/task.js';

class Renderer{
  constructor (app) {
    this.app = app;
  }

  render(){
    this._render();
  }

  _render(){
    console.log('must be override')
  }
}

class DOMRenderer extends Renderer{
  constructor (parent, app) {
    super(app);
    if (!localStorage['todo']) {
      localStorage['todo'] = JSON.stringify([]);
    }else{
      this.app = App.load(JSON.parse(localStorage['todo']));
    }

    this.app.addFolder(Folder.get('todoApp'));
    this.currentFolder = this.app.getFolders()[0];
    this.isEditMode = false;

    this.$newTodo = parent.querySelector('#new-todo-title');
    this.$todoCount = parent.querySelector('.todo-count strong');
    this.$filter = parent.querySelector('.count-container .filters');
    this.$todoList = parent.querySelector('#todo-list');

    this.addDomEvent();
    this.render();
  }

  addDomEvent(){
    this.$filter.addEventListener('click', (e) => this.changeSelection(e));
    this.$newTodo.addEventListener('keydown',  (e) => this.handleCreateTodo(e));
  }

  changeSelection(e){
    if(e.target.tagName !== 'A') return;
    const targetClass = e.target.classList;
    const selection = this.currentFolder.getFilter();
    if (targetClass.contains(selection)) return false;
    this.$filter.querySelector('.' + selection).classList.remove('selected');
    targetClass.add('selected');
    this.currentFolder.setFilter(targetClass[0]);
    this.render();
    return;
  }

  createTodoTask (task) {
    const li = document.createElement('li')
    li.classList.add = task.isCompleted && 'completed';
    li.innerHTML = `
            <div class="view">
                <input class="toggle" type="checkbox" ${task.isCompleted ? 'checked' : ''}/>
                <label class="label">${task.title}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value=${task.title} />`
    li.addEventListener('click' , (e) => {
      this.handleTodo(e, task);
    });
    li.addEventListener('dblclick' , (e) => {
      this.changeEditMode(e);
    })
    this.$todoList.appendChild(li);
    return;
  }


  escapeEditMode(target) {
    target.closest('li') && target.closest('li').classList.remove('editing');
    this.isEditMode = false;
    return;
  }

  handleCreateTodo(e, task = null){
    if(e.key === 'Escape'){
      this.escapeEditMode(e.target);
      return;
    }
    if(e.key !== 'Enter') return;
    const todo = e.target.value.trim();
    if(!todo) return;
    if(task){
      task.setTitle(todo);
      this.isEditMode = false;
    }else{
      task = Task.get(todo);
      this.currentFolder.addTask(task);
    }
    e.target.value = '';
    this.render();
    return;
  }
  handleTodo(e, task){
    e.stopPropagation();
    const target = e.target;
    if (target.classList.contains('edit')) {
      e.target.addEventListener('keydown', (e) => this.handleCreateTodo(e, task));
    }
    if (target.classList.contains('toggle')) {
       task.toggle();
       this.render()
    }
    if (target.classList.contains('destroy')) {
      this.currentFolder.removeTask(task);
      this.render();
    }
  return;
  }

  changeEditMode(e){
    if (e.target.classList.contains('label')) {
      if (!this.isEditMode) {
        this.isEditMode = true;
        const li = e.target.closest('li');
        li.setAttribute('class', 'editing')
      }
    }
  }

  _render () {
    console.log('render fuc')
    this.$todoList.innerHTML = '';
    if(!this.currentFolder) return;
    const tasks = this.currentFolder.getTasks();
    tasks.forEach((task) => {
      this.createTodoTask(task)
    });
    this.$todoCount.innerHTML = tasks.length;
    localStorage['todo'] = JSON.stringify(this.app);
  }
}


new DOMRenderer(document, new App());
