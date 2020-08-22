import TodoCount from './TodoCount.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import {fetchUsers} from './api.js';
function App(){
    this.data=[];
    this.allData = [];
    this.checkData = [];
    let that = this;
    const $completedBtn = document.querySelector('.completed');
    const $activeBtn =document.querySelector('.active');
    const $allBtn =document.querySelector('.all');
    const $todoList = document.querySelector('#todo-list-board');
    this.setState=async(nextData)=>{
        let data = await fetchUsers();
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
    $completedBtn.addEventListener('click', (e) => {
        const checkList = document.querySelectorAll("input[name=todo]:checked");
        let nextData = [];
        if(checkList.length !== 0){
            checkList.forEach((data)=>{
            nextData = [
                ...nextData,
                data.value
            ]
        })
        this.checkData = nextData;
        this.setState(nextData);
        }else{
            this.setState(this.checkData);
        }  
    });
    $todoList.addEventListener('click',e=>{
        const index = e.target.id.split('-')[1];
        const nextData = [...this.allData];
        if(e.target.tagName === 'BUTTON'){
            nextData.splice(index, 1);
            this.setState(nextData);
        }
    });
    $todoList.addEventListener('dblclick',e=>{
        document.querySelector('input[name=todo]').disabled=false
        
    });
    $activeBtn.addEventListener('click', (e) => {
        const checkList = document.querySelectorAll("input[name=todo]:checked");
        let nextData = [];
        let activeTodo = this.allData;
        if(checkList.length !== 0){
            checkList.forEach((data)=>{
            nextData = [
                ...nextData,
                data.value
            ]
        }) 
        
        }else{
            this.checkData.forEach((data)=>{
                nextData = [
                    ...nextData,
                    data
                ]
            });
        }
        nextData.forEach((e=>{
                const completedTodo = activeTodo.indexOf(e);
                activeTodo.splice(completedTodo,1)}
        ))
        this.setState(activeTodo);
    });
}
new App();
//href="/#"