export default function TodoFilter({ elementId, filterTodo }) {
  this.init = () => {
    if (!(this instanceof TodoFilter)) {
      throw new Error(`Invalid function call ${this}`);
    }
    this.$todoFilter = document.querySelector(`.${elementId}`);
    this.filterTodo = filterTodo;
  };
  this.switchFilter = (filter) => {
    if (filter === "#active") {
      this.filterTodo({
        type: "active",
      });
    } else if (filter === "#completed") {
      this.filterTodo({
        type: "completed",
      });
    } else {
      this.filterTodo({
        type: "all",
      });
    }
  };
  this.clickHandler = (evt) => {
    if (
      evt.target.tagName !== "LI" &&
      evt.target.tagName !== "UL" &&
      !evt.target.classList.contains("selected")
    ) {
      [...evt.target.parentNode.parentNode.childNodes].forEach((el) => {
        if (el.tagName === "LI") {
          el.childNodes[1].classList.remove("selected");
        }
      });
      evt.target.classList.add("selected");
      this.switchFilter(evt.target.hash);
    }
  };
  this.bindEventListener = () => {
    this.$todoFilter.addEventListener("click", this.clickHandler);
  };
  this.init();
  this.bindEventListener();
  this.setCurrFilter();
}
