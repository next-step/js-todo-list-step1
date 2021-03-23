export const checkTodo = ({ target }) => {
    if(!target.classList.contains('toggle')) return;
    const $li = target.closest('li');
    const { id } = $li.dataset;

    const localVal = JSON.parse(localStorage.getItem(id));
    localVal.completed = localVal.completed === false || false;
    localStorage.setItem(id, JSON.stringify(localVal));

    $li.classList.toggle('completed');
};