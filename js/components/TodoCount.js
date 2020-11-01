import { checkTarget } from "../utils/validators.js"
class TodoCount {
    constructor({$target, state}) {
        checkTarget($target)
        
        this.$target = $target;
        this.state = state;

        this.render();
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        const count = this.state.countTodos();
        this.$target.innerHTML = `총 <strong>${count}</strong> 개`
    }
}

export default TodoCount;