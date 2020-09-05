const TodoItem = (props) => {
    const viewMode = (complete, contents) => {
        return `
            <input class="toggle" type="checkbox" ${ complete && 'checked' }/>
            <label class="label">${ contents }</label>
            <button class="destroy"></button>
        `;
    };

    const editMode = (contents) => `
            <input class="edit" type="text" value="${ contents }">    
    `;

    const { index, contents, complete, editing } = props;
    return `
            <li class="view ${ editing && 'editing' || complete && 'completed' }" data-index="${ index }">
                 ${ editing ? editMode(contents) : viewMode(complete, contents) }
            </li> 
        `;
};

export default TodoItem;
