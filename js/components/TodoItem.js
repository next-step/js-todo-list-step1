class TodoItem{
    constructor(content, checked =false) {
        return this.build({content, checked});
    }

    build({ content, checked }){
        const frame = `<li>
                    <div class="view">
                      <input class="toggle" type="checkbox" ${checked ? 'checked': ''}>
                      <label class="label">${content}</label>
                      <button class="destroy"></button>
                    </div>
                    <input class="edit" value="${content}" />
                  </li>`;
        let $div = document.createElement('div');
        $div.innerHTML = frame;
        return $div.firstElementChild;
    }
}

export default TodoItem;
