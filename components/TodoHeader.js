function TodoHeader({$target}) {
    this.init = () => {
        this.$target = $target;
        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = `<h1>Roki's TODOS</h1>`;
    }

    this.init();
}

export default TodoHeader;
