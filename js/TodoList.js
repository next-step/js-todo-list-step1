export default function TodoList(props) {
    const {
        $target,
        handleToggle: onToggle,
    } = props;
    this.data = props.data;

    $target.addEventListener("click", (e) => {
        const {id} = e.target.closest("li").dataset;
        onToggle(Number(id));
    });

    this.setState = (newData) => {
        this.data = newData;
        this.render();
    };

    this.render = () => {
        $target.innerHTML = this.data
            .map((todo) => {
                const contentHtmlAsString = `
                    <div class="view"> 
                        <input class="toggle" type="checkbox" ${todo.isCompleted ? "checked" : ""}>
                        <label class="label">${todo.content}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="${todo.content}">`;
                const completedClassName = todo.isCompleted ? 'class = "completed"' : "";
                return `<li ${completedClassName} data-id="${todo.id}">${contentHtmlAsString}</li>`;
            })
            .join("");
    };

    this.render();

}