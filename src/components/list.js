import Component from '../lib/component.js';
import store from '../store/index.js';

const List = class extends Component {
    constructor() {
        super({
            store,
            element : document.querySelector('.todo-list')
        });
    }
    //토글, 삭제
    toDoClick = (e) => {
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
    toDoEdit = (e) => {
        const thisToDoId = e.target.parentNode.id;
        const thisToDo = document.getElementById(thisToDoId);
        thisToDo.className="editing";
        thisToDo.querySelector(".edit").select();
    }

    toDoKeyup = (e) => {
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

    render(){
        
        if(store.state.items.length === 0){
            this.element.innerHTML = `<li>할 일을 추가해주세요</li>`
            return;
        }
        const filteredTodos = store.state.items.filter( todo => {
            if(store.state.filterType=='completed'){
                return todo.completed==true;
            }
            if(store.state.filterType=='active'){
                return todo.completed==false;
            }
            return todo;
        });
        this.element.innerHTML = `
        ${filteredTodos.map(item=>{
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
    //이벤트 설정할 수 있게 해줌
    setEvent(target){
        target.addEventListener('click', e => {
            this.toDoClick(e);
        });
        target.addEventListener('dblclick', e => {
            this.toDoEdit(e);
        });
        target.addEventListener('keyup', e => {
            this.toDoKeyup(e);
        });
    }

}
export default List;