import { todoFilterTemplate } from "../utils/templates.js";

export default function TodoFilter(params) {
  const { $target, onChangeFilter } = params;
  let filter = params.filter || "";

  $target.addEventListener("click", (e) => {
    onChangeFilter(e.target.className);
  });

  this.setState = (nextFilter) => {
    filter = nextFilter;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = todoFilterTemplate(filter);
  };

  this.render();
}
