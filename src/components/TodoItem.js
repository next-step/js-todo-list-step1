class TodoItem {
    props;
    constructor (props) {
        this.props = props;
    }
    viewMode (complete, contents) {
        return `
            <input class="toggle" type="checkbox" ${ complete && 'checked' }/>
            <label class="label">${ contents }</label>
            <button class="destroy"></button>
        `;
    }

    editMode (contents) {
        return `
            <input class="edit" type="text" value="${contents}">    
        `
    }

    render = () => {
        const { index, contents, complete, editing }= this.props;
        const { viewMode, editMode } = this;

        return `
            <li class="view ${ editing && 'editing' || complete && 'completed' }" data-index="${ index }">
                 ${ editing ? editMode(contents) : viewMode(complete, contents) }
            </li>
        `
    }
}

export default TodoItem;
