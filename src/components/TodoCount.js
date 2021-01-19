import {Component} from "../core/Component/index.js";
import {store} from "../modules/index.js";
import {getFilteredList} from "../modules/todo/reducer.js";

export default class TodoCount extends Component{
    render() {
        const {todoList, filtered} = store.getState();
        const count = getFilteredList(todoList, filtered).length;

        return `총 <strong>${count}</strong> 개`
    }
}