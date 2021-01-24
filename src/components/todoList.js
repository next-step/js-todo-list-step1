import { actionTypes, progressTypes } from '../utils/constants.js';
import createStore from '../store/store.js';
import reducer from '../store/reducer.js';

const todoList = () => {
    const store = createStore(reducer);
    
    const $listUl = document.getElementById('todo-list');
    
    function render () {
      const state = store.getState();
      const itemList = Object.values(state).map(obj => {
          return (`
          <li id="item-${obj.seq}" class="${obj.completedFlag === false ? '' : progressTypes.COMPLETED}">
            <div class="view">
              <input class="toggle" type="checkbox" ${obj.completedFlag === true? 'checked' : ''}/>
              <label class="label">${obj.content}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="완료된 타이틀" />
          </li>
          `)
          }).join("");
      $listUl.innerHTML = itemList;
      onClickHandler();
    };
    
    function onClickHandler() {
      Object.values(store.getState()).map(obj => {
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
      });
    }

    render();
};

export default todoList;
