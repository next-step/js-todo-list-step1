
export {activeOf}

const $toDoList = document.querySelector(".todo-list");

function Detecting(list, val) {
    console.log(val);
    const classList = list.classList;
    const isCompleted = classList.contains('completed');
    classList.remove('hidden');
    const isAdd = (val === 'all') ||
                  (val === 'completed' && isCompleted) ||
                  (val === 'active' && !isCompleted);
    if (!isAdd) classList.add('hidden');
}

const activeOf = type => $toDoList.querySelectorAll("li")
                                 .forEach(item => Detecting(item, type));

