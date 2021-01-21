const test = "test";
const $ul = document.querySelector('#todo-list');

const $input = document.querySelector('#new-todo-title');
$input.addEventListener('keypress', (e) => {
    console.log(e.keyCode)
    if (e.keyCode === 13) {
        console.log('keycode')
        const inputVal = e.target.value;
        $ul.appendChild(createTodoItem(inputVal));
    }
})

function createTodoItem(inputVal) {
    const $li = document.createElement('li');
    const $div = document.createElement('div');
    const $input = document.createElement('input');
    const $label = document.createElement('label');
    const $button = document.createElement('button');

    const $inputOther = document.createElement('input');


    $label.classList.add('label');
    $button.classList.add('destroy');
    $div.classList.add('view');

    $input.type = 'checkbox';


    $div.appendChild($input);
    $div.appendChild($label);
    $div.appendChild($button);

    $li.appendChild($div);

    $li.appendChild($inputOther);

    return $li;
}

