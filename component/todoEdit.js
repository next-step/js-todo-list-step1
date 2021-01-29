import { toDos } from '../init.js';
import { saveToDos } from './todoLocalStorage.js';

const updateEditTitle = (event) => {
  for (let obj of toDos) {
    if (obj.id === parseInt(event.path[1].dataset.id)) {
      obj.title = event.path[0].value;
    }
  }
  saveToDos();
};

const updateEdit = (event) => {
  const targetInput = event.target;
  const targetLabel = targetInput.previousSibling.previousSibling.querySelector('label');
  if (event.key === 'Enter') {
    targetLabel.innerText = targetInput.value;
    targetInput.closest('li').classList.remove('editing');
    updateEditTitle(event);
  } else if (event.key === 'Escape') {
    targetInput.closest('li').classList.remove('editing');
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
