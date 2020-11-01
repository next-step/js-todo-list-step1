import { checkTarget, checkFunction } from "../utils/validators.js"
import { EVENT, CLASS, NODE } from "../utils/constants.js";

class TodoTab {
    constructor({$target, selectedTab, onChangeTab}) {
        checkTarget($target);
        checkFunction(onChangeTab)

        this.$target = $target
        this.$tabs = this.$target.querySelectorAll('a');
        this.onChangeTab = onChangeTab
        this.selectedTab = selectedTab;

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

    setState(tab) {
        this.selectedTab = tab
        this.render()
    }

    render() {
        this.$tabs.forEach(tab => {
            if(tab.classList.contains(CLASS.SELECTED)) {
                tab.classList.remove(CLASS.SELECTED)
            } 
            if(tab.classList.contains(this.selectedTab)) {
                tab.classList.add(CLASS.SELECTED)
            }
        });
    }
}   

export default TodoTab