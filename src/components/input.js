import Component from '../lib/component.js';
import store from '../store/index.js';

const Input = class extends Component {
    constructor() {
        super({
            store,
            element : document.getElementById("new-todo-title")
        });
    }
    
    addToDo = (e) => {
        //엔터 키에만 수행
        const toDos = store.state.items;
        if(e.key !== "Enter" || e.target.value.replace(/(\s*)/g, "")==""){
            return;
        }
        const toDoId = toDos.length == 0 ? 1 : parseInt(toDos[toDos.length-1].id)+1;
        const text = e.target.value;
        const toDoObj = {
            id: toDoId, 
            text: text,
            completed : false
        };
        store.dispatch('addToDo', toDoObj);
        //입력시엔 할 일들을 보두 보여줌
        store.dispatch('setFilterType', 'all');
        e.target.value = '';
        e.target.focus();
    }

    setEvent(target){
        target.addEventListener('keyup', e => {
            this.addToDo(e);
        });
    }
}
export default Input;
