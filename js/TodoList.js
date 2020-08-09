export default function TodoList(props) {
    const {
        $target,
        handleToggle: onToggle,
        handleRemove: onRemove,
        handleEdit: onEdit,
    } = props;
    let data = props.data;

    this.onKeydown = (e) => {
        const $li = e.target.closest("li");
        const {id} = e.target.closest("li").dataset;

        if (e.key === "Escape") {
            const index = data.findIndex(todo => (todo.id === Number(id)));
            e.target.value = data[index].description;
            $li.classList.toggle("editing");
        }

        if (e.key === "Enter") {
            const description = e.target.value;
            onEdit(Number(id), description);
        }
    };

    $target.addEventListener("click", (e) => {
        const {id} = e.target.closest("li").dataset;
        if (e.target.classList.contains("toggle")) {
            onToggle(Number(id));
        } else if (e.target.classList.contains("destroy")) {
            onRemove(Number(id));
        }
    });

    $target.addEventListener("dblclick", (e) => {
        if (e.target.classList.contains("label")) {
            const $li = e.target.closest("li");
            $li.classList.toggle("editing");
        }
    });

    $target.addEventListener("keydown", (e) => {
        if (!e.target.classList.contains("edit")) {
            return;
        }

        this.onKeydown(e);
    });

    this.setState = (newData) => {
        data = newData;
        this.render();
    };

    this.render = () => {
        $target.innerHTML = data
            .map((todo) => {
                const contentHtmlAsString = `
                    <div class="view"> 
                        <input class="toggle" type="checkbox" ${todo.isCompleted ? "checked" : ""}>
                        <label class="label">${todo.description}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="${todo.description}">`;
                const completedClassName = todo.isCompleted ? 'class = "completed"' : "";
                return `<li ${completedClassName} data-id="${todo.id}">${contentHtmlAsString}</li>`;
            })
            .join("");
    };

    this.render();

}