import { todoCountTemplate } from "../utils/templates.js";

export default function TodoCount(params) {
  const { $target } = params;
  let count = params.count || 0;

  this.setState = (nextCount) => {
    count = nextCount;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = todoCountTemplate(count);
  };

  this.render();
}
