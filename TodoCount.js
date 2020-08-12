function TodoCount(data){
    this.data = data;
    const $TodoCount = document.querySelector(".todo-count>strong");
    this.setState=(nextData)=>{
        this.data = nextData;
        this.render();
    }
    this.render=()=>{
        $TodoCount.innerText = this.data.length;
    }
    this.render();
}