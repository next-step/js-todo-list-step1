import { Store } from "../_core/index.js";
import { ToDoItemService } from "../services/index.js";

export const toDoStore = new Store({

  state: {
    items: ToDoItemService.fetchAll(),
    editingIndex: -1,
    type: 'all'
  },

  mutations: {

    SET_ITEMS (state, payload) {
      state.items = payload;
      ToDoItemService.put(payload);
    },

    SET_EDITING_INDEX (state, payload) {
      state.editingIndex = payload;
    },

    SET_TYPE (state, payload) {
      state.type = payload;
    }

  },

  getters: {

    filteredItems ({ items, type }) {
      return Object.entries(items)
                   .filter(([, { completed }]) => (type === 'all') ||
                                                  (type === 'completed' && completed) ||
                                                  (type === 'active' && !completed));
    },

  }
})