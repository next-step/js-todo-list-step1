export class TodoCount {
    target;

    constructor(target) {
        this.target = target;
    }

    render(count) {
        this.target.innerHTML = `총 <strong>${count}</strong> 개`;
    }
}