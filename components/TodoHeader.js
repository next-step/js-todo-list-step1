function TodoHeader() {
    this.init = () => {
        let $target = document.querySelector("#todo-app-header");
        $target.innerHTML = `<h1>Roki's TODOS</h1>`;
    }

    this.init();
}

export default TodoHeader;
