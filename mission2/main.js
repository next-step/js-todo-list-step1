import TodoCount from './TodoCount.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import Users from './Users.js';
import {fetchUsers,userTodoList,addTodo,deleteTodo,toggleTodoList,modifyTodoList} from './api.js';
function App(){
    this.data=[];
    this.allData = [];
    this.checkData = [];
    let that = this;
    that.username = 'doraemong'
    const $completedBtn = document.querySelector('.completed');
    const $activeBtn =document.querySelector('.active');
    const $allBtn =document.querySelector('.all');
    const $todoList = document.querySelector('#todo-list-board');
    this.setState=async(userName)=>{
        let data = await fetchUsers(userName);
        this.todoList.setState(data.todoList);
        this.todoCount.setState(data.todoList);
    };
    this.todoInput = new TodoInput({
        onAddTodo:async(text)=>{
            const nextData = [
                ...this.data,
                text
            ]
            this.allData = [
                ...this.data,
                text
            ]
            let data= await addTodo('doraemong',text);
            this.setState('doraemong');
        }
    });
    this.todoList = new TodoList({
        onRemove: async function(id) {
        await deleteTodo(that.username,id);
        that.setState(that.username)
        }
    });
    this.userList = new Users({});
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
    this.init=async()=>{
        this.user = await userTodoList();
        this.userList.render(this.user);
    }
    this.init();
}
new App();
//href="/#"