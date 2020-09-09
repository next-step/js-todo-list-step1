const TodoViewItem = (complete, contents) => `
        <input class="toggle" type="checkbox" ${ complete && 'checked' }/>
        <label class="label">${ contents }</label>
        <button class="destroy"></button>
    `;

export default TodoViewItem;