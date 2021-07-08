import Component from "./core/component.js";
import Filter from "./components/Filter.js"
import Input from "./components/Input.js"
import TodoList from "./components/TodoList.js"

class App extends Component{ 
    setup(){
        const todo = JSON.parse(localStorage.getItem("todo")? 
        localStorage.getItem("todo") : localStorage.setItem("todo", '{"count": 0,"Filtermode" : 0, "List" : []}')); 
        this.$state= todo;
    }

    template(){
        return `
            <h1>TODOS</h1>
            <input id="new-todo-title" class="new-todo"
                placeholder="할일을 추가해주세요"autofocus
            />
            <main id="todos">
                <input class="toggle-all" type="checkbox" />
                <ul id="todo-list" class="todo-list"></ul>
                <div id="todo-filter" class="count-container"></div>
            </main>
        `
    }
  
    mounted(){
        const {$state ,onAddTodo, onToggleTodo, onDeleteTodo, onCountTodo, onFilter} = this;
        const _Input = document.querySelector('#new-todo-title');
        const _TodoList = document.querySelector('#todo-list');
        const _Filter = document.querySelector('#todo-filter');

        new Input(_Input, onAddTodo.bind(this));
        new TodoList(_TodoList, {
            $state,
            onToggleTodo: onToggleTodo.bind(this),
            onDeleteTodo : onDeleteTodo.bind(this)
        });
        new Filter(_Filter);
    }

    onAddTodo(content){
        //const {count,Filtermode,List} = this.$state;
        const id = String(this.$state.count*1+1);
        const Filtermode = this.$state.Filtermode;
        const List = [...this.$state.List, {id ,content:content,activate:false}];
        localStorage.setItem("todo",JSON.stringify({List,count : id*1,Filtermode}));
        this.setState(JSON(localStorage.getItem("todo")));
        //localStorage.setItem("todo",this.$state);
    }
    onToggleTodo(id){

    }
    onDeleteTodo(id){
        const List = this.$state.List.filter(todo => todo.id!==id);
        const count = String(this.$state.count*1+1);
        const Filtermode = this.$state.Filtermode;
        localStorage.setItem("todo",JSON.stringify({List,count :count*1, Filtermode}))
        this.setState(List);
    }
    onCountTodo(){}
    onFilter(mode){}
}


export default App;