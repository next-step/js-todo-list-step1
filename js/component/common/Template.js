export default class Template {
    // template element 생성; 생성하지 않고 text를 return 하면 element 형태가 아닌 text형태로 append된다..
    getTodoItem(code, isComplete, title) {
        const returnData = document.createElement('template'); 

        returnData.innerHTML = `<li id="${code}" class="${isComplete ? 'completed' : ''}">
                                    <div class="view">
                                        <input class="toggle" type="checkbox" ${isComplete ? "checked" : ""}/>
                                        <label class="label">${title}</label>
                                        <button class="destroy"></button>
                                    </div>
                                    <input class="edit" value="${title}" />
                                </li>`;
        return returnData.content.firstChild; // 생성한 returnData element의 firstChild element반환
    }
}
