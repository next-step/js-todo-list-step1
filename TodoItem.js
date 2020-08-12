function TodoItem(contents){
    const $newItem = document.createElement("li");
    $newItem.innerHTML = `
        <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">${contents}</label>
            <button class="destroy"></button>
            </div>
            <input class="edit" value=${contents} />`;
    return $newItem;
}