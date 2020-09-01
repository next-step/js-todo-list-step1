export default function TodoList({data,onRemove}){
    this.data = data;
    const $todoList = document.querySelector('#todo-list-board');
    $todoList.addEventListener('click',e=>{
        const id = e.target.closest('label').dataset.id
        //const index = e.target.id.split('-')[1];
        //const nextData = [...this.allData];
        if(e.target.tagName === 'BUTTON'){
            //await deleteTodo(that.username,id);
            e.stopPropagation()
            onRemove(id);
            //nextData.splice(index, 1);
            //this.setState(nextData);
        }
    });
    this.setState=(nextData)=>{
        this.data = nextData;
        this.render();
    }
    this.render=()=>{
        $todoList.innerHTML =  
    `<ul>
    ${this.data.map((text, index) =>
    `<label data-id="${text._id}"><input type="checkbox" name="todo" value="${text.contents}" data-id="${text._id}">
        ${text.contents}
        <button id='todo-${index}' class="delete-btn">X</button>
    </br>
    </label>`
    ).join('')}
    </ul>`
    }
}