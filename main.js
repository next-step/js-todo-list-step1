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
  
  $button.addEventListener('click', ()=>{
      const $ul2 = document.querySelector('#todo-list');
      $ul2.removeChild($li);
  })

  $label.addEventListener('dblclick', () => {
        console.log('dbclick')
        $li.classList.toggle('editing');
  })

    $inputOther.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            console.log('enter');
            let tempVal = e.target.value;
            $label.innerText = tempVal;
            $li.classList.toggle('editing');
        } else if (e.keyCode === 27) {
            console.log('esc')
            $li.classList.toggle('editing');
        }
    })




  $div.classList.add("view");

  $input.type = "checkbox";

  $div.appendChild($input);
  $div.appendChild($label);
  $div.appendChild($button);

  $li.appendChild($div);

  $li.appendChild($inputOther);

  return $li;
}
