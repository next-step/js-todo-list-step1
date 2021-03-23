import { FILTER_STATE, LOCAL_STORAGE } from "/js/utils/constants.js";

function CustomLocalStorage() {
  this.saveItems = function (items) {
    localStorage.setItem(LOCAL_STORAGE.ITEM_KEY, JSON.stringify(items));
  };

  this.loadItems = function () {
    let items = localStorage.getItem(LOCAL_STORAGE.ITEM_KEY);
    if (items !== null) {
      return JSON.parse(items);
    }
    return [];
  };

  this.saveFilterState = function (filterState) {
    localStorage.setItem(LOCAL_STORAGE.FILTER_STATE_KEY, filterState);
  };

  this.loadFilterState = function () {
    const filterState = localStorage.getItem(LOCAL_STORAGE.FILTER_STATE_KEY);
    if (filterState === null || filterState === "undefined") {
      return FILTER_STATE.ALL;
    }
    return filterState;
  };
}

export const $localStorage = new CustomLocalStorage();
