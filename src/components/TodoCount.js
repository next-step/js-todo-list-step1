export default function TodoCount({ todoItems }) {
    const $countSpan = document.querySelector('.todo-count');
    $countSpan.innerHTML = `총 <strong>${todoItems.length}</strong> 개` ;
}
