import Component from '../lib/component.js';
import store from '../store/index.js';

const toDoList = document.querySelector('.todo-list');

const toDoClick = (e) => {
    const thisToDoId = e.target.parentNode.id;
    switch(e.target.className){
        case("toggle") : 
            store.state.items.filter((v, i)=>{
                if(i==thisToDoId-1){
                    store.dispatch('toggleToDo', v);
                }
            });
            break;
        case("destroy") : 
            store.dispatch('destroyToDo', thisToDoId);
            break;
    }
}
//수정 
const toDoEdit = (e) => {
    const thisToDoId = e.target.parentNode.id;
    const thisToDo = document.getElementById(thisToDoId);
    thisToDo.className="editing";
    thisToDo.querySelector(".edit").select();
}

const toDoKeyup = (e) => {
    const thisToDoId = e.target.parentNode.id;
    const thisToDo = document.getElementById(thisToDoId);
    
    switch(e.key){
        case 'Enter':
            store.state.items.filter((v, i)=>{
                if(i==thisToDoId-1){
                    v.text = e.target.value;
                    store.dispatch('editToDo', v);
                }
            });
            thisToDo.className="";
            break;
        case 'Escape':
            thisToDo.className="";
            break;
    }

};

toDoList.addEventListener('click', toDoClick);
toDoList.addEventListener('dblclick', toDoEdit);
toDoList.addEventListener('keyup', toDoKeyup);



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
            <li id='${item.id}' class='${item.completed==true?'completed':''}'>
                <input class="toggle" type="checkbox" ${item.completed==true?'checked':''}/>
                <label class="label">${item.text}</label>
                <button class="destroy"></button>
                <input class="edit" value='${item.text}' />
            </li>`
        }).join('')}
        `;
        
    }

}
export default List;