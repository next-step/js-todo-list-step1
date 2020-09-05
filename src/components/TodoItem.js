const TodoItem = (props) => {
    const { index, contents, complete, editing } = props;

    const viewMode = (complete, contents) => `
        <input class="toggle" type="checkbox" ${ complete && 'checked' }/>
        <label class="label">${ contents }</label>
        <button class="destroy"></button>
    `;

    const editMode = (contents) => `
        <input class="edit" type="text" value="${ contents }">    
    `;

    return `
        <li class="view ${ editing && 'editing' || complete && 'completed' }" data-index="${ index }">
             ${ editing ? editMode(contents) : viewMode(complete, contents) }
        </li> 
    `;
};

export default TodoItem;
