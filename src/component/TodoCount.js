export class TodoCount {
    render(count) {
        const $count = document.querySelector('.todo-count').innerHTML = `
            총 <strong>${count}</strong> 개
        `;
    }
}