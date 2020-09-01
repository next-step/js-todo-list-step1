export default function TodoInput({onAddTodo}){
    const $todoInput = document.querySelector('#new-todo-title');
    $todoInput.addEventListener('keydown',e=>{
        if(e.target.value && e.key ==="Enter"){
            onAddTodo(e.target.value);
        }
    })
}