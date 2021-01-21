const $ul = document.querySelector("#todo-list");

const $input = document.querySelector("#new-todo-title");
$input.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    const inputVal = e.target.value;
    $ul.appendChild(createTodoItem(inputVal));
  }
});

function createTodoItem(inputVal) {
  const $li = document.createElement("li");
  const $div = document.createElement("div");
  const $input = document.createElement("input");
  const $label = document.createElement("label");
  const $button = document.createElement("button");

  const $inputOther = document.createElement("input");
  $inputOther.classList.add("edit");

  $input.classList.add("toggle");
  $input.addEventListener("click", () => {
    $li.classList.toggle("completed");
    $input.classList.toggle("checked");
  });

  $label.classList.add("label");
  $label.innerText = inputVal;

  $button.classList.add("destroy");
  $div.classList.add("view");

  $input.type = "checkbox";

  $div.appendChild($input);
  $div.appendChild($label);
  $div.appendChild($button);

  $li.appendChild($div);

  $li.appendChild($inputOther);

  return $li;
}
