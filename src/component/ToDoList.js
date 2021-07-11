import { TODO_STATE } from "../constant/index.js";
const getStateClass = (state) => {
    return state === TODO_STATE.COMPLETED ? 'class="completed"' :
           state === TODO_STATE.EDITING   ? 'class="editing"'   :
           '';
  }
export class ToDoList {
    state; 
    $target;
    constructor(target){
        this.$target = target;
        this.setState({
            items:[]
        })
    }
    render(){
        const {items} = this.state;
        this.$target.innerHTML = items.map(({state,title})=>`
         <li ${ getStateClass(state) }>
            <div class="view">
                <input class="toggle" type="checkbox" ${state === TODO_STATE.COMPLETED ? 'checked' : '' }/>
                <label class="label">${title}</label>
                <button class="destroy"></button>
            </div>
            ${ state === TODO_STATE.EDITING ? `<input class="edit" value="${title}" />` : '' }
        </li>
        `).join('')

    }
    initEventListener(){
        const toggleComponents = this.$target.querySelectorAll('.toggle');
        const {items} = this.state;
        toggleComponents.forEach((element,idx) => {
            element.addEventListener('change',(()=>{
                const todoItem = items[idx];
                todoItem.state = element.checked ? TODO_STATE.COMPLETED : TODO_STATE.TODO
                items[idx] = {...todoItem};
                this.setState({items:[...items]});
            })
        )});

    }
    setState(payload){
        this.state = {...this.state, ...payload};
        this.render();
        this.initEventListener();
    }
    addItem(itemTitle){
        this.setState({
            items: [...this.state.items,
                {
                    title:itemTitle, state: TODO_STATE.TODO
                }]
        })
    }
}

