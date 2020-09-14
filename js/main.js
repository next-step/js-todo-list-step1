import { TodoInput } from "./TodoInput.js"
import { TodoList } from "./TodoList.js"
import { TodoCount } from "./TodoCount.js"
import  ItemController from "./ItemController.js"
import { qs, qsa } from "./utils.js"
class TodoApp {
    constructor() {
        this.init();
    }

    init = ()=>{
        this.loadItems();
        window.qs = qs;
        window.qsa = qsa;
        
        const todoCount = new TodoCount({
            onChangeView: viewMode => {
                todoList.render.view(viewMode);
            }
        });
        const todoList = new TodoList({
            count:()=>{
                todoCount.count();
            }
        });
        const todoInput = new TodoInput({
            addItem: (title) => {
                const item = ItemController.addItem({title:title});
                todoList.render.add(item);
                todoCount.count();
            },
            count: ()=>{
                todoCount.count();
            }
        });
    }

    loadItems = () => {
        console.log('load %citems%c...', 'color:#ff0000;','color:#000');
        if(!!window.localStorage.getItem("TodoApp")){
            console.log("localStorage has items!");
            //JSON.parse(window.localStorage.getItem("item"));//TodoState로 전달
            //{items:[item,...],id=0,viewMode:"all"}
            return;
        }
        console.log("%citems not found!!","font-weight:bold;");
    }
}  

new TodoApp();