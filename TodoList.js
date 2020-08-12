function TodoList({data}){
    this.data = data;
    const $todoList = document.querySelector('#todo-list-board');
    this.setState=(nextData)=>{
        this.data = nextData;
        this.render();
    }
    this.render=()=>{
        $todoList.innerHTML =  
    `<ul>
    ${this.data.map((text, index) =>
    `<label><input type="checkbox" name="todo" value="${text}">
        ${text}
        <button class="delete-btn">X</button>
    </br>
    </label>`
    ).join('')}
    </ul>`
    }
}