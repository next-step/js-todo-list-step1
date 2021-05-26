function TodoInput({$app, onKeyup}) {
    this.onKeyup = onKeyup
    this.$target = document.createElement("input");
    this.$target.id = "new-todo-title";
    this.$target.className = "new-todo";
    this.$target.placeholder = "할일을 추가해주세요"
    this.$target.autofocus = true;
    $app.appendChild(this.$target);

    this.setEvent = () => {
        this.$target.addEventListener("keyup", onKeyup)
    }
    this.setEvent();

}

export default TodoInput
