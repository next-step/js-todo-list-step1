import {initAddNewItem} from './AddNewItem.js';
import {initTodolistButton} from './ControlTodoButton.js';
import {initControlLocalStorage} from './TodoLocalStorage.js';
import {initTodolistItems} from './ControlTodoItems.js';


function init() {
  // 페이지 로드 시 이벤트 리스너 부착
  initAddNewItem();
  initTodolistButton();
  initControlLocalStorage();
  initTodolistItems();
}

init()
