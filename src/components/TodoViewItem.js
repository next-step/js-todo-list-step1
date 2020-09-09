const TodoViewItem = ({ complete, contents }) => {
    return `
        <input class="toggle" type="checkbox" ${ complete && 'checked' }/>
        <label class="label">${ contents }</label>
        <button class="destroy"></button>
    `;
};

export default TodoViewItem;