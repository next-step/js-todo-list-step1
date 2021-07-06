import Component from "./core/component.js";
import Filter from "./components/Filter.js"
import Input from "./components/Filter.js"
import TodoList from "./components/Filter.js"

class App extends Component{ 
    setup(){
        this.$state = localStorage.getItem('todo')? 
        localStorage.getItem('todo') : localStorage.setItem('todo', '{"count": "0","Filtermode" : "0", "List" : "[]"}'); 
    }

    template(){
        return `
            <h1>TODOS</h1>
            <input id="new-todo-title" class="new-todo"
                placeholder="할일을 추가해주세요"autofocus
            />
            <main id="todo-list">
                <input class="toggle-all" type="checkbox" />
                <ul id="todo-list" class="todo-list">
                <div id="todo-filter" class="count-container"></div>
            </main>
        `
    }

    mounted(){
        const {onAddTodo, onToggleTodo, onDeleteTodo, onCountTodo, onFilter} = this;
        const _Input = document.querySelector('#new-todo-title');
        const _TodoList = document.querySelector('#todo-list');
        const _Filter = document.querySelector('#todo-filter');

        new Input(_Input);
        new TodoList(_TodoList);
        new Filter(_Filter);
    }

    onAddTodo(){}
    onToggleTodo(){}
    onDeleteTodo(){}
    onCountTodo(){}
    onFilter(mode){}
}


export default App;