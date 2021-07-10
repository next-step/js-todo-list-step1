import Component from "../core/component.js";

class TodoList extends Component{
    setup(){
        this.$state = this.$props.$state;

        console.log(this.$target);
        console.log(this.$props);
    }

    template(){
        const todoList = this.$state;
        return `
        ${todoList.List.map(item =>`
          <li data-id="${item.id}" class=${item.activate?"completed":"notcompleted"}>
            <div class="view">
              <input class="toggle"  id=${item.id} type="checkbox" ${item.activate?"checked":""}/>
              <label class="label">${item.content}</label>
              <button id=${item.id} class="destroy"></button>
            </div>
            <input class="edit" value="${item.content}" />
          </li>
          `).join('')}
         `
    }
    mounted(){
        const deleteBtns = document.querySelectorAll('.destroy');
        deleteBtns.forEach(element => {
            element.addEventListener('click',(e)=>{
                this.$props.onDeleteTodo(e.target.id);
            }) 
        });

        const toggleBtn = document.querySelectorAll('.toggle');
        toggleBtn.forEach(element => {
          element.addEventListener('click',(e)=>{
            this.$props.onToggleTodo(e.target.id);
          })
        });
    }
}

export default TodoList;