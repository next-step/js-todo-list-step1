import { removeRouter, setRouter } from './routes/router.js';
import { setEvent, removeEvent } from './utils/event.js';
import { renderView } from './views/todoList.js';


export default () => {
  return {
    init: () => {
      renderView();
      setEvent();
      setRouter();
    },
    destroy: () => {
      removeEvent();
      removeRouter();
    }
  }
}
