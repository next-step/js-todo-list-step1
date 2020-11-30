import Component from '../lib/component.js';
import store from '../store/index.js';

const Count = class extends Component {
    constructor() {
    super({
        store,
        element: document.querySelector('.todo-count')
    });
    }
    
    render(){
        this.element.innerHTML =  `${store.state.items.length}`
    }
}
export default Count;
