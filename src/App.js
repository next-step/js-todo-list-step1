import Main from "./component/Main.js";
import TodoInput from "./component/TodoInput.js";
import { getTodos } from "./util/localStorage.js";

function App($app) {
    this.state = {
        toDos: []
    }
    new TodoInput({
        $app,
        onKeyup: ({target, key}) => {
           if(key === "Enter" && target.value){
               const newToDos = getTodos();
               this.setState({
                   toDos : [...newToDos,{
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
        $app
    })

    this.setState = (nextState) => {
        this.state = {...this.state, ...nextState};
        main.setState(this.state);
    }

    const init = () => {
        const toDos = getTodos();
        this.setState({toDos})
    }

    init();
}

export default App