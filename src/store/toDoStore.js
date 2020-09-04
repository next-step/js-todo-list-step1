import { Store } from "../core/index.js";

export const SET_ITEMS = 'SET_ITEMS';
export const SET_EDITING_INDEX = 'SET_EDITING_INDEX';
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE';

export const toDoStore = new Store({

  persistentKey: 'toDoStore',

  state: {
    items: [],
    editingIndex: -1,
    filterType: 'all'
  },

  mutations: {

    [SET_ITEMS] (state, payload) {
      state.items = payload;
    },

    [SET_EDITING_INDEX] (state, payload) {
      state.editingIndex = payload;
    },

    [SET_FILTER_TYPE] (state, payload) {
      state.filterType = payload;
    }

  },

  getters: {

    filteredItems ({ items, filterType }) {
      return Object.entries(items)
                   .filter(([, { completed }]) => (filterType === 'all') ||
                                                  (filterType === 'completed' && completed) ||
                                                  (filterType === 'active' && !completed));
    },

  }
})