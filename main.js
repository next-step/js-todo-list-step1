function App(){
    this.data=[];
    this.allData = [];
    let that = this;
    const $activeBtn = document.querySelector('.completed');
    const $completedBtn =document.querySelector('.active');
    const $allBtn =document.querySelector('.all');
    this.setState=(nextData)=>{
        this.data = nextData;
        this.todoList.setState(this.data);
        this.todoCount.setState(this.data);
    };
    this.todoInput = new TodoInput({
        onAddTodo:(text)=>{
            const nextData = [
                ...this.data,
                text
            ]
            this.allData = [
                ...this.data,
                text
            ]
            this.setState(nextData);
        }
    });
    this.todoList = new TodoList({});
    this.todoCount = new TodoCount(this.data);
    $allBtn.addEventListener('click', (e) => {
        this.setState(this.allData);
    });

        $activeBtn.addEventListener('click', (e) => {
            const checkList = document.querySelectorAll("input[name=todo]:checked");
            let nextData = [];
            checkList.forEach((data)=>{
                nextData = [
                    ...nextData,
                    data.value
                ]
            })
            this.setState(nextData);
        });
        $completedBtn.addEventListener('click', (e) => {
            const checkList = document.querySelectorAll("input[name=todo]:checked");
            let nextData = [];
            let activeTodo = this.allData;
            checkList.forEach((data)=>{
                nextData = [
                    ...nextData,
                    data.value
                ]
            })
            nextData.forEach((e=>{
                const completedTodo = activeTodo.indexOf(e);
                activeTodo.splice(completedTodo,1)}
            ))
            this.setState(activeTodo);
        });
}
//nextData.forEach(e=>{this.data.filter(data=>{return data == e})})
new App();