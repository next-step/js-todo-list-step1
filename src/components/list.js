import Component from '../lib/component.js';
import store from '../store/index.js';

const List = class extends Component {
    constructor() {
        super({
            store,
            element : document.querySelector('.todo-list')
        });
    }
    
    render(){
        if(store.state.items.length === 0){
            this.element.innerHTML = `<li>할 일을 추가해주세요</li>`
            return;
        }
        this.element.innerHTML = `
        ${store.state.items.map(item=>{
            return `
            <li id='${item.id}' class='${item.tDClass}'>
                <input class="toggle" type="checkbox" ${item.tDClass ?'checked':''}/>
                <label class="label">${item.text}</label>
                <button class="destroy"></button>
                <input class="edit" value=${item.text} />
            </li>`
        }).join('')}
        `;
        
        this.element.addEventListener('click', (event)=>{
            const thisToDoId = event.target.parentNode.id;
            const thisToDo = document.getElementById(thisToDoId);
            switch(event.target.className){
                case("toggle") : 
                    store.dispatch('toggleItem', thisToDo);
                    break;
                case("destroy") : 
                    toDoDestroy(thisToDoId);
                    break;
            }
        });

        /*
        this.element.querySelectorAll('.destroy').forEach((button, index)=>{
            button.addEventListener('click', ()=>{
                store.dispatch('clearItem', {index});
            })
        })*/
    }

}
export default List;