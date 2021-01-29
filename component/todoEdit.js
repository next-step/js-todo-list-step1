import { toDos } from '../init.js';
import { saveToDos } from './todoLocalStorage.js';

const updateEditTitle = (targetLi, targetInput) => {
  console.log(targetLi);
  for (let obj of toDos) {
    if (obj.id === parseInt(targetLi.dataset.id)) {
      obj.title = targetInput.value;
    }
  }
  saveToDos();
};

const updateEdit = (event) => {
  const targetInput = event.target;
  const targetLabel = targetInput.previousSibling.previousSibling.querySelector('label');
  const targetLi = targetInput.closest('li');
  if (event.key === 'Enter') {
    targetLabel.innerText = targetInput.value;
    targetLi.classList.remove('editing');
    updateEditTitle(targetLi, targetInput);
  } else if (event.key === 'Escape') {
    targetLi.classList.remove('editing');
  }
};
const handleEdinting = async (event) => {
  const targetInput = event.target.parentNode.nextSibling.nextSibling;

  try {
    await targetInput.addEventListener('keyup', updateEdit);
  } catch (error) {
    console.log(error);
  }
};

export const handleEdit = (event) => {
  const targetLi = event.target.closest('li');
  targetLi.classList.add('editing');
  handleEdinting(event);
};
