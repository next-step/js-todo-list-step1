export default function TodoItemWrapper({isDone, isUpdate}) {
  const element = document.createElement("li");

  if (isDone) {
    element.classList.add("completed")
  }

  if (isUpdate) {
    element.classList.add("editing");
  }

  const addItemChild = ({todoCheckbox, todoTitle, todoDestroy}) => {
    element.appendChild(todoCheckbox.render());
    element.appendChild(todoTitle.render());
    element.appendChild(todoDestroy.render());

    return render();
  }
  const render = () => element;

  return {
    addItemChild
  }
}
