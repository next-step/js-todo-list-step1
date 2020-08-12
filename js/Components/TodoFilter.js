function TodoFilter($target, type) {
  if (!this instanceof TodoFilter) {
    throw new Error("Create instance with 'new'");
  }

  this.type = type;

  this.render = () => {
    $target.innerHTML = `
        <ul class="filters">
            <li>
                <a class="all ${
                  this.type === "all" ? "selected" : ""
                }" href="/#">전체보기</a>
            </li>
            <li>
                <a class="active ${
                  this.type === "active" ? "selected" : ""
                }" href="#active">해야할 일</a>
            </li>
            <li>
                <a class="completed ${
                  this.type === "completed" ? "selected" : ""
                }" href="#completed">완료한 일</a>
            </li>
        </ul>;
    `;
  };

  this.render();
}

export default TodoFilter;
