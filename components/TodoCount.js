function TodoCount(app, data) {
    this.app = app;
    this.data = data;
    
    const $count = document.querySelector('.todo-count strong');
    
    this.totalCount = () => {
        const countNum = this.data.length;
        $count.innerHTML = countNum;
    }
    
    this.setState = newData => {
        this.data = newData;
        this.totalCount();
    }
    this.totalCount();
}

export default TodoCount;