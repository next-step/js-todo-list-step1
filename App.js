import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';
import newId from './components/utils/newId.js'

function App() {
    this.data = [];
    this.app = this;

    //컴포넌트 인스턴스 생성
    const todoInput = new TodoInput(this.app);
    const todoList = new TodoList(this.data, this.app);
    const todoCount = new TodoCount(this.app, this.data)
    
   
    this.addTodo = newTodo => {
        const data = this.data.slice();
        data.push({
            text: newTodo,
            id: newId(),
            completed: false,
            modifyMode: false
        })
        this.setState(data);
    }
    
    this.toggleTodo = toggleId => {
        const data = this.data.slice();
        for(let i = 0; i < data.length; i++) {
            if(data[i].id === toggleId) {
                data[i].completed = !data[i].completed
            }
        }
        this.setState(data);
    }
   
    this.deleteTodo = deleteId => {
        // 왜 const data = this.data.slice()복제해서 하면 안되지???
        const data =  this.data.filter(todo => todo.id !== deleteId);
        this.setState(data)
    }
    
    this.editTodo = (editedText, id) => {
        const data = this.data.slice();
        for(let i =0; i < data.length; i++) {
            if(data[i].id === id ) {
                data[i].text = editedText;
            }
        }
        this.setState(data)
    }
    
    
    
    this.setState = updatedData => {
        this.data = updatedData;
        this.render();
    }
    this.render = () => {
        todoList.setState(this.data);
        todoCount.setState(this.data)
    }
    
    
}

export default App;
