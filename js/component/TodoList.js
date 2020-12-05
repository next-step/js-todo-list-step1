export default class  TodoList {
    data = [];
    showData = [];
    $todoList = null;
    $todoItems = null;
    $todoCount = null;
    $todoEdit = null;
    $todoFilters = null;
    $todoItemsChecks = null;

    constructor({data, todoList, todoItems, todoItemsChecks}) {
        this.data = data;
        this.$todoList = todoList;
        this.$todoItems = todoItems;
        this.$todoEdit = document.querySelectorAll(".edit");
        this.$todoCount = document.querySelector(".todo-count strong");
        this.$todoItemsChecks = todoItemsChecks;
        this.$todoFilters = document.querySelectorAll(".filters a");
        this.$todoFilters.forEach(data => {
            data.addEventListener("click", event => this.onFilterClick(event));
        });

        if(data.length > 0) {
            this.setAllData();
        }
        
    }

    onClick(event) {
        if(event.target.getAttribute('type') === "checkbox") {
            this.onItemCompleted(event);
        } else if(event.target.getAttribute('class') === "destroy"){
            this.onDelete(event);
        }
    }

    onItemCompleted(event) {
        if(!event.target.checked) {
            event.target.offsetParent.setAttribute("class", "");    
            event.target.setAttribute("checked", "");
        } else {
            event.target.offsetParent.setAttribute("class", "completed");    
            event.target.setAttribute("checked", "checked");
        }
        
        this.data.forEach(data => {
            if(data.code == event.target.offsetParent.getAttribute('id')) {
                data.isComplete = event.target.checked;
            }
        })

        localStorage.setItem("todoData", JSON.stringify(this.data));
    }

    onDelete(event) {
        let deleteIndex = -1;
        let deleteId = event.target.offsetParent.getAttribute('id');
        let count = 0;

        for(let i=0;this.showData.length;i++) {
            if(this.showData[i].code == deleteId) {
                this.showData.splice(i, 1);
                event.target.offsetParent.remove();
                break;
            }
        }

        for(let i=0;i<this.data.length;i++) {
            if(this.data[i].code === deleteId) {
                
                this.data.splice(i, 1);
            }
        };
        localStorage.setItem("todoData", JSON.stringify(this.data));
        this.setCount(this.showData.length);
    }

    onItemEdit(event) {
        if(event.target.getAttribute('type') !== "checkbox" && event.target.getAttribute('class') !== "destroy") {
            event.target.offsetParent.setAttribute("class", "editing");    
        }
    }

    onKeyup(event) {
        if(event.keyCode === 13) { // enter
            let index = this.data.findIndex(data => {
                return data.code === event.target.offsetParent.getAttribute('id');
            });

            this.data[index].title = event.target.value;
            event.target.offsetParent.setAttribute("class", "");    
            this.setAllData();
            localStorage.setItem("todoData", JSON.stringify(this.data));
        } else if(event.keyCode === 27) { // esc
            let index = this.data.findIndex(data => {
                return data.code === event.target.offsetParent.getAttribute('id');
            });

            event.target.offsetParent.setAttribute("class", "");    

            this.setAllData();
        }
    }

    onFilterClick(event) {
        let index = 0;
        let targetClass = event.target.getAttribute("class");
        this.$todoFilters.forEach(data => {
            index = data.getAttribute("class").indexOf("selected")
        
            if(index > 0) {
                data.setAttribute("class", data.getAttribute("class").substring(0, index-1));
            }
        })

        event.target.setAttribute("class", `${event.target.getAttribute("class")} selected`);
        if(targetClass === "all") {
            this.setAllData();
        } else if(targetClass === "active") {
            this.setFilterData(false);
        } else if(targetClass === "completed"){
            this.setFilterData(true);
        }
    }


    setAllData() {
        let addItemHtml = ""
        this.showData = this.data;
        this.$todoList.innerHTML = "";
        this.data.forEach(data => {
            addItemHtml += 
            `<li id="${data.code}" class="${data.isComplete ? "completed" : ""}">
                <div class="view">
                    <input class="toggle" type="checkbox" ${data.isComplete ? "checked" : ""}/>
                    <label class="label">${data.title}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${data.title}" />
            </li>`;
        })
        
        this.setRendor(addItemHtml);
        this.setCount(this.data.length)
    }

    setFilterData(complete) {
        let addItemHtml = ""
        let count = 0;
        this.showData = [];
        this.$todoList.innerHTML = "";

        if(complete) {
            this.data.forEach(data => {
                if(data.isComplete) {
                    count++;
                    addItemHtml += 
                    `<li id="${data.code}" class="${data.isComplete ? "completed" : ""}">
                        <div class="view">
                            <input class="toggle" type="checkbox" ${data.isComplete ? "checked" : ""}/>
                            <label class="label">${data.title}</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="${data.title}" />
                    </li>`;

                    this.showData.push(data);
                }
            })
        } else {
            this.data.forEach(data => {
                if(!data.isComplete) {
                    count++;
                    addItemHtml += 
                    `<li id="${data.code}" class="${data.isComplete ? "completed" : ""}">
                        <div class="view">
                            <input class="toggle" type="checkbox" ${data.isComplete ? "checked" : ""}/>
                            <label class="label">${data.title}</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="${data.title}" />
                    </li>`;

                    this.showData.push(data);
                }
            })
        }

        this.setRendor(addItemHtml);
        this.setCount(count);
    }

    setRendor(html) {
        this.$todoList.innerHTML = this.$todoList.innerHTML + html;

        this.$todoItems = document.querySelectorAll("#todo-list li");
        this.$todoEdit = document.querySelectorAll(".edit");
        this.$todoItems.forEach(data => {
            data.addEventListener("click", event => this.onClick(event));
            data.addEventListener("dblclick", event => this.onItemEdit(event));
        })

        this.$todoEdit.forEach(data => {
            data.addEventListener("keyup", event => this.onKeyup(event));
        })
    }

    setCount(count) {
        this.$todoCount.innerHTML = count;
    }

    onAdd(event) {
        let appendHtml = 
            `<li id="${event.code}" class="">
                <div class="view">
                    <input class="toggle" type="checkbox"/>
                    <label class="label">${event.title}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${event.title}"/>
            </li>`;
        this.data.push(event);
        this.showData.push(event);
        localStorage.setItem("todoData", JSON.stringify(this.data));
        this.setRendor(appendHtml);
        this.setCount(this.data.length);
    }
}