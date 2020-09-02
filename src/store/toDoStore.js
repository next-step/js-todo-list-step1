import {Store} from "../_core/Store";
import {ToDoItemService} from "../services";

export const toDoStore = new Store({

  state: {
    items: ToDoItemService.fetchAll(),
    editingIndex: -1,
    type: 'all'
  },

  mutations: {
    setItems (state, items) {
      state.items = items;
      ToDoItemService.put(items);
    },
  },

})