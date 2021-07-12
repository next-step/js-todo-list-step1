export default class TodoCount{
  constructor(){
    this.count = document.querySelector('.todo-count strong');
  }
  showCount(count){
    console.log(count)
    this.count.innerHTML = count;
  }
}