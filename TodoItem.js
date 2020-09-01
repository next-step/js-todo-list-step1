function TodoItem(contents, checked){
    const $newTodoItem = document.createElement("li");
    $newTodoItem.innerHTML = `
        <div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">${contents}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${contents} />`;

    if(checked) {
        $newTodoItem.classList.add("completed");
        $newTodoItem.querySelector(".toggle").checked = true;
    }
    else{
        $newTodoItem.querySelector(".toggle").checked = false;
    }
    
    return $newTodoItem;
}