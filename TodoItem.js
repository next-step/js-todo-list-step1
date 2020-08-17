function TodoItem(contents, checked){
    const $newTodoItem = document.createElement("li");
    $newTodoItem.innerHTML = `
        <div class="view">
            <input class="toggle" type="checkbox" ${checked} ? "checked" : "" />
            <label class="label">${contents}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${contents} />`;
    
    return $newTodoItem;
}