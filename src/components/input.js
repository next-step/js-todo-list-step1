import Component from '../lib/component.js';
import store from '../store/index.js';

const Input = class extends Component {
    constructor() {
        super({
            store,
            element : document.getElementById("new-todo-title")
        });
    }
    
    
    render(){
        const toDos = store.state.items
        this.element.addEventListener('keyup',(event) =>{
            //엔터 키에만 수행
            if(event.key !== "Enter" || this.element.value.replace(/(\s*)/g, "")==""){
                return;
            }
            const toDoId = toDos.length == 0 ? 1 : parseInt(toDos[toDos.length-1].id)+1;
            const text = event.target.value;
            const toDoObj = {
                id: toDoId, 
                text: text,
                tDClass : ''
            };
            store.dispatch('addItem', toDoObj);
            this.element.value = '';
            this.element.focus();
        });
    }
}
export default Input;
