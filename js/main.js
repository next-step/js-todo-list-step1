import { qs, qsa } from "./utils.js"
import { TodoInput } from "./TodoInput.js"
import { TodoList } from "./TodoList.js"
import { TodoCount } from "./TodoCount.js"
import  ItemController from "./ItemController.js"
class TodoApp {
    constructor() {
        this.init();
    }

    init(){
        this.loadItems();
        window.qs = qs;
        window.qsa = qsa;
        
        new TodoCount();
        new TodoList();
        new TodoInput();
    }

    loadItems(){
        console.log('load %citems%c...', 'color:#ff0000;','color:#000');
        if(!!window.localStorage.getItem("TodoApp")){
            console.log("localStorage has items!");
            //JSON.parse(window.localStorage.getItem("item"));//TodoState로 전달
            //{items:[item,...],id=0,viewMode:"all"}
            return;
        }
        console.log("%citems not found!!","font-weight:bold;");
        console.log(ItemController);
    }
}  

new TodoApp();