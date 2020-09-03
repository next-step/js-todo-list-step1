export class TodoCount {
    #target; #props;

    constructor(target, props = {}) {
        this.#target = target;
        this.#props = props;
    }

    render(count) {
        this.#target.innerHTML = `총 <strong>${count}</strong> 개`;
    }
}