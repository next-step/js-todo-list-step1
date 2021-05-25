import Main from "./component/Main.js";
import TodoInput from "./component/TodoInput.js";
import { getTodos } from "./util/localStorage.js";

function App($app) {
    this.state = {
        count: 0,
        toDos: []
    }
    const todoInput = new TodoInput({
        $app,
        onKeyup: ({target, key}) => {
           if(key === "Enter" && target.value){
               this.setState({
                   count: this.state.count + 1,
                   toDos : [...this.state.toDos,{
                    idx: String(Date.now()),
                    value: target.value,
                    completed: false
                    }]
                })
                target.value= ""
           }
        }
    })
    const main = new Main({
        $app,
        initalState : this.state.toDos
    })

    this.setState = (nextState) => {
        this.state = nextState;
        main.setState(this.state);
    }

    const init = () => {
        const toDos = getTodos();
        this.setState({
            ...this.state,
            count: toDos.length,
            toDos: toDos
        })
    }

    init();
}

export default App