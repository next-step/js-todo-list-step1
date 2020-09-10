import { checkTarget, checkFunction } from "../utils/validator.js"
import { EVENT, CLASS, NODE } from "../utils/constant.js";

class TodoTab {
    constructor({$target, onChangeTab}) {
        checkTarget($target);
        checkFunction(onChangeTab)

        this.$target = $target
        this.onChangeTab = onChangeTab

        this.bindEvents()
    }

    bindEvents = () => document.addEventListener(EVENT.CLICK, this.onClick)

    onClick = (e) => {
        e.preventDefault();    
        if (e.target.nodeName !== NODE.A) return;

        const clickedTab = e.target.className;
        if (clickedTab.includes(CLASS.SELECTED)) return;


        this.onChangeTab(clickedTab);
    }
}   

export default TodoTab