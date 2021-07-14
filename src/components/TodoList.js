import Component from "../core/component.js";
import {$$} from "../utils/util.js";

class TodoList extends Component{
    setup(){
        this.$state = this.$props.$state;
    }

    template(){
        const todoList = this.$state;
        return `
        ${todoList.List.map(item =>`
          <li data-id="${item.id}" class=${item.activate?"completed":"notcompleted"}>
            <div class="view">
              <input class="toggle"  id=${item.id} type="checkbox" ${item.activate?"checked":""}/>
              <label id=${item.id} class="label">${item.content}</label>
              <button id=${item.id} class="destroy"></button>
            </div>
            <input id=${item.id} class="edit" value="${item.content}" />
          </li>
          `).join('')}
         `
    }
    mounted(){
        const deleteBtns = $$('.destroy');
        deleteBtns.forEach(element => {
            element.addEventListener('click',(e)=>{
                this.$props.onDeleteTodo(e.target.id);
            }) 
        });

        const toggleBtn = $$('.toggle');
        toggleBtn.forEach(element => {
          element.addEventListener('click',(e)=>{
            this.$props.onToggleTodo(e.target.id);
          })
        });

        const editBtn = $$('.label');
        editBtn.forEach(element =>{
            element.addEventListener('dblclick', (e)=>{
                this.editTodo(e.target);
            })
        });
    }
    editTodo(targetDom){
       const edit_li = targetDom.parentNode.parentNode;
       const edit_input = targetDom.parentNode.nextElementSibling;
       edit_li.classList.add('editing');

       if(edit_li.classList.contains("editing")){
         edit_li.addEventListener('keyup',(e)=>{
            if(e.key=="Enter"){
              this.$props.onUpdateTodo(targetDom.id, edit_input.value);
            }
            if(e.key=="Escape"){
              edit_li.classList.remove('editing');
            }
         })
       }
    }
}

export default TodoList;