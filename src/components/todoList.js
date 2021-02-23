import { actionTypes, progressTypes, filterTypes } from '../utils/constants.js';
import createStore from '../store/store.js';
import reducer from '../store/reducer.js';
import todoCount from './todoCount.js';

const todoList = (selectedFiter = filterTypes.ALL) => {
  const store = createStore(reducer);
  
  const $listUl = document.getElementById('todo-list');

  function saveTodoToLocal() {
    const state = store.getState();
    localStorage.setItem('todoState', JSON.stringify(state));
  }
  
  function render() {
    const state = store.getState();
    let showItems = { ...state };

    Object.values(state).map(item => {
      if(selectedFiter === filterTypes.ACTIVE && item.completedFlag) {
        delete showItems[item.seq];
        return showItems;
      } else if(selectedFiter === filterTypes.COMPLETED && !item.completedFlag) {
        delete showItems[item.seq];
        return showItems;
      }
    });

    const itemList = Object.values(showItems).map(obj => {
      return (`
      <li id="item-${obj.seq}" class="${obj.completedFlag === false ? (obj.editFlag === false ? '': progressTypes.EDITING) : progressTypes.COMPLETED}">
        <div class="view">
          <input class="toggle" type="checkbox" ${obj.completedFlag === true? 'checked' : ''}/>
          <label class="label">${obj.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value=${obj.content} />
      </li>
      `)
      }).join("");
    $listUl.innerHTML = itemList;

    bindEvent(showItems);
    onEdit();
    todoCount(showItems);
    saveTodoToLocal();
  };

  function bindEvent(showItems) {
    Object.values(showItems).map(obj => {
      const $liItem = document.getElementById("item-"+obj.seq);
      
      $liItem.addEventListener('click', e => {
        switch(e.target.className) {
          case 'toggle': 
            store.dispatch({
              type: actionTypes.TOGGLE_CHECK,
              seq: obj.seq,
            });
            return render();
          case 'destroy':
            store.dispatch({
              type: actionTypes.DESTROY,
              seq: obj.seq,
            });
            return render();
          default:
            return;
        }
      });

      $liItem.addEventListener('dblclick', e => {
        if(e.target.className === 'label') {
          if (document.querySelectorAll('.editing').length < 1) {
            store.dispatch({
              type: actionTypes.EDIT_ON_OFF,
              seq: obj.seq,
            });
            onEdit();
            render();
          } else {
            // 
          }
          
        }
      });
    });
  }

  function onEdit() {
    const $editingItem = document.querySelector('.editing');
    if($editingItem !== null) {
      const $editingItemId = $editingItem.getAttribute('id');
      const $seq = $editingItemId.split('-')[1];

      //onFocus
      const $editInput = $editingItem.children[1];
      $editInput.focus();
      $editInput.setSelectionRange($editInput.value.length, $editInput.value.length);

      $editingItem.addEventListener('keydown', e => {
        if(e.key === 'Escape') {
          store.dispatch({
            type: actionTypes.EDIT_ON_OFF,
            seq: $seq,
          });
          render();
        }

        if(e.key === 'Enter' && e.target.value.length > 0) {
          store.dispatch({
              type: actionTypes.EDIT_CONTENT,
              seq: $seq,
              content: e.target.value
          });
          render();
        }
        
      });
    }
    
  }
  
  render();
};

export default todoList;
