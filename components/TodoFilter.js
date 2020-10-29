function TodoFilter(app, data) {  
    this.app = app;
    this.data = data;
    
    const $filters = document.querySelector('.filters');
    const $all = document.querySelector('.all');
    const $active = document.querySelector('.active');
    const $completed = document.querySelector('.completed');
    const btns = [$all, $active, $completed]; 

  
}

export default TodoFilter;