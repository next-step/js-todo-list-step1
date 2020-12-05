export default class TodoInput {
    onAdd = null;

    constructor({target, onAdd}) {
        this.onAdd = onAdd;
        target.addEventListener("keyup", event => this.onKeyup(event));
    }

    onKeyup(event) {
        if(event.code === 13) { // enter
            if(event.target.value.length > 0) {
                this.onAdd(event.target.value);
                event.target.value = "";
            } else {
                alert("할일을 입력해주세요.");
            }
        }
    }
}