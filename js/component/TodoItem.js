export default class TodoItem {
    data = [];
    dataIdx = {};
    itemClick = null;
    itemCheck = null;
    itemDelete = null;
    constructor({itemClick, itemCheck, itemDelete}) {
        this.itemClick = itemClick;
        this.itemCheck = itemCheck;
        this.itemDelete = itemDelete;
    }

    getItemTemplate(id, title, isComplete) {
        const liElement = document.createElement("li");
        const viewElement = document.createElement("div");
        const toggleElement = document.createElement("input");
        const labelElement = document.createElement("label");
        const destroyElement = document.createElement("button");
        const editElement = document.createElement("input");

        toggleElement.setAttribute("id", id);
        toggleElement.setAttribute("class", "toggle");
        toggleElement.setAttribute("type", "checkbox");
        isComplete ? toggleElement.setAttribute("checked", isComplete) : '';
        toggleElement.addEventListener("click", event => this.onItemChecked(event));

        labelElement.setAttribute("id", id);
        labelElement.setAttribute("class", "label");
        labelElement.innerHTML = title;
        labelElement.addEventListener("dblclick", event => this.onItemClick(event));

        destroyElement.setAttribute("id", id);
        destroyElement.setAttribute("class", "destroy");
        destroyElement.addEventListener("click", event => this.onItemDelete(event));

        viewElement.setAttribute("class", "view");
        viewElement.append(toggleElement);
        viewElement.append(labelElement);
        viewElement.append(destroyElement);
        
        editElement.setAttribute("id", id);
        editElement.setAttribute("class", "edit");
        editElement.setAttribute("value", title);
        editElement.addEventListener("keyup", event => this.onKeyup(event));

        liElement.setAttribute("id", id);
        liElement.setAttribute("class", isComplete ? "completed" : "");
        liElement.append(viewElement);
        liElement.append(editElement);

        return liElement;
    }

    onItemChecked(event) {
        const value = event.target.checked;

        event.target.closest("li").setAttribute("class", value ? "completed": "");
        event.target.closest(".view").childNodes[1].setAttribute("class", value ? "checked": "");        

        this.itemCheck(event.target.closest("li").getAttribute("id"));
    }

    onItemClick(event) {
        event.target.closest("li").setAttribute("class", "editing");
    }

    onItemDelete(event) {
        const value = event.target.getAttribute("id");

        event.target.closest("#todo-list").childNodes.forEach((data, i) => {
            if(value === data.getAttribute("id")) {
                event.target.closest("#todo-list").removeChild(data);
            }
        })
        this.itemDelete(value);
    }

    onKeyup(event) {
        const value = event.target.getAttribute("id");

        if(event.key === "Enter") {
            if(event.target.value.length > 0) {
                event.target.closest("li").childNodes[0].childNodes[1].innerHTML = event.target.value
                event.target.closest("li").setAttribute("class", "");
                this.itemClick({code: value, title: event.target.value});
            } else {
                alert("할일을 입력해주세요.");
            }            
        } else if(event.key === "Escape") {
            event.target.closest("li").setAttribute("class", "");
        }
    }
}