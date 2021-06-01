export default function TodoCount() {
  this.count = document.querySelector("strong").innerHTML;

  this.render = (updatedItems) => {
    document.querySelector("strong").innerHTML = updatedItems.length;
  };
}
