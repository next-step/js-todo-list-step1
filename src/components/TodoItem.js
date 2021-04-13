
export function todoItemTemplate (item) {
    let returnValue = ``;

    switch (item.status) {
        case "editing" :
        case "view" :
            returnValue = `
                <li id=${item.id} class=${item.status}>
                    <div class="view">
                        <input class="toggle" id=${item.id} type="checkbox" />
                        <label class="label" id=${item.id}>${item.contents}</label>
                        <button class="destroy" id=${item.id}></button>
                    </div>
                    <input class="edit" id=${item.id} value="${item.contents}" />
                </li>
            `;
        break;

        case "completed" :
            returnValue = `
                <li id=${item.id} class="completed">
                    <div class="view">
                        <input class="toggle" id=${item.id} type="checkbox" checked />
                        <label class="label" id=${item.id}>${item.contents}</label>
                        <button class="destroy" id=${item.id}></button>
                    </div>
                    <input class="edit" id=${item.id} value=${item.contents} />
                </li>
            `;
            break;
    }

    return returnValue;
}