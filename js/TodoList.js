export function TodoList(itemController,{onRemove,onChangeState,onChangeTitle}) {
    const $todoList = document.querySelector("#todo-list");

    this.clickEvent = ({target}) => {
        if (target.classList == "destroy") this.removeItem(target);
        if (target.classList == "toggle") this.changeItemState(target);
    }

    this.keyEvent = (event) => {
        if(event.target.classList == "edit"){
            if(event.key == "Escape"){ this.stopChangeTitle(event); }
            if(event.key == "Enter") { this.changeTitle(event); }
        }
    }

    this.removeItem = target => {
        if(confirm("정말로 삭제하시겠습니까?")){
            onRemove(getTarget.id(target));
        }
    }

    this.changeItemState = target => {
        onChangeState(getTarget.id(target),"completed");
    }

    this.editTitleMode = ({target}) => {
        if (target.nodeName == "LABEL"){
            onChangeState(getTarget.id(target),"editing");
        }
    }   

    this.stopChangeTitle = ({target}) => {
        getTarget.input(target).value = getTarget.label(target).innerText;
        onChangeState(getTarget.id(target),"editing");
    }

    this.changeTitle = ({target}) => {
        const value = getTarget.input(target).value.trim();
        if(!value || value == getTarget.label(target).innerText) 
            return this.stopChangeTitle({target:target});
        onChangeTitle(getTarget.id(target),value);
    }

    $todoList.addEventListener("click", this.clickEvent);
    $todoList.addEventListener("dblclick", this.editTitleMode);
    $todoList.addEventListener("keydown", this.keyEvent);
    // $todoList.addEventListener("focusout", this.changeTitle);

    this._render = {
        add : (item,viewMode) =>{
            if(viewMode != "completed"){
                const template = todoItemTemplate(item);
                $todoList.insertAdjacentHTML("beforeend", template);
            }
        },
        delete : id => {
            getTarget.li(id).remove();
        },
        update : (id,target,value,viewMode) => {//정리필요
            const $li = getTarget.li(id);
            const item = itemController.getItemById(id);

            if(target == "title") {
                $li.outerHTML = todoItemTemplate({id:id,title:value,completed:item.completed});
            }
            else if(target == "state"){
                if(value == "completed"){
                    viewMode == "all" ? 
                        $li.classList.toggle("completed") :
                        $li.remove();
                }
                if(value == "editing"){
                    $li.classList.toggle("editing");
                    $li.lastElementChild.focus();
                }
            }
        },
        changeView : viewMode => {
            const items = itemController.getItemsByState(viewMode);
            const template = items.map(todoItemTemplate);
            $todoList.innerHTML = template.join("");
        }
    }

    const getTarget = {
        id : (target) =>{
            return Number(target.closest("li").dataset.id);
        },
        label : (target) =>{
            return target.closest("li").querySelector("label");
        },
        input : (target) => {
            return target.closest("li input");
        },
        li : (id) => {
            return $todoList.querySelector(`li[data-id='${id}']`);
        }
    }

    function todoItemTemplate({title,id,completed}){
        return ` <li data-id="${id}" ${completed ? ' class="completed"' : ''}>
                        <div class="view">
                            <input class="toggle" type="checkbox" ${completed?"checked":""}>
                            <label class="label">${title}</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="${title}">
                    </li>`;
    }
}
