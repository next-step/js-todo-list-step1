import Component from '../lib/component.js';
import store from '../store/index.js';

const Filter = class extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.filters')
        });
    }

    toDoFilter = (e) => {
        const todoClassName = e.target.className;

        switch(todoClassName){
            case("active"): 
                store.dispatch('setFilterType',todoClassName);
                return;
            case("completed"): 
                store.dispatch('setFilterType',todoClassName);
                return;
            case("all"): 
                store.dispatch('setFilterType',todoClassName);
                return;
        }
    }
        
    render(){
        const allBtn = document.querySelector("a.all");
        const activeBtn = document.querySelector("a.active");
        const completedBtn = document.querySelector("a.completed");

        switch(store.state.filterType){
            case("active"):
                allBtn.classList.remove("selected");
                activeBtn.classList.add("selected");
                completedBtn.classList.remove("selected");
                return;
            case("completed"):
                allBtn.classList.remove("selected");
                activeBtn.classList.remove("selected");
                completedBtn.classList.add("selected");
                return;
            case("all"):
                allBtn.classList.add("selected");
                activeBtn.classList.remove("selected");
                completedBtn.classList.remove("selected");
                return;
        }
    }

    setEvent(target){
        target.addEventListener('click', e => {
            this.toDoFilter(e);
        })
    }
}
export default Filter;