export default function TodoFilter({onAllSelected, onCompleted, onActive}) {
  const $todoFilter = document.querySelector('.filters');

  const showAll = (event) => {
    if (!event.target.classList.contains('all')) return;
    onAllSelected();
  }
  const showCompleted = (event) => {
    if (!event.target.matches('.completed')) return;
    onCompleted();
  }
  
  const showActive =(event) => {
    if (!event.target.matches('.active')) return;
    onActive();
  }

  $todoFilter.addEventListener('click', event => showCompleted(event));
  $todoFilter.addEventListener('click', event => showActive(event));
  $todoFilter.addEventListener('click', event => showAll(event));
}