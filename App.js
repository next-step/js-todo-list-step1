import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import newId from './components/utils/newId.js'

function App() {
    this.data = [
        // {
        //     text: 'study!!',
        //     id: 1,
        //     completed: false
        // },
        // {
        //     text: '운동 헛둘헛둘',
        //     id: 2,
        //     completed: true
        // }
    ];
    this.app = this;

    //컴포넌트 인스턴스 생성
    const todoInput = new TodoInput(this.app);
    const todoList = new TodoList(this.data, this.app);
    
   
    this.addTodo = newTodo => {
        const data = this.data.slice();
        data.push({
            text: newTodo,
            id: newId(),
            completed: false
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
   
    
    this.setState = updatedData => {
        this.data = updatedData;
        this.render();
    }
    this.render = () => {
        todoList.setState(this.data);
    }
    
    
}

export default App;
