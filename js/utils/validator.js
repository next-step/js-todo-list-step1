import { MESSAGE, APP_STATE } from './constant.js';

export const checkTarget = ($target) => {
  if (!$target instanceof HTMLElement) {
    throw new Error(`Error : ${target} - ${MESSAGE.NOT_HTML_ELEMENT}`);
  }
};

export const checkTypeArray = (data) => {
  if (!Array.isArray(data)) {
    throw new Error(`Error : ${data} - ${MESSAGE.NOT_TYPE_ARRAY}`);
  }
};

export const checkTypeFunction = (func) => {
  if (!func || typeof func !== 'function') {
    throw new Error(`Error : ${func} - ${MESSAGE.NOT_TYPE_FUNCTION}`);
  }
};

export const checkAppState = (state) => {
  if (!state.hasOwnProperty(APP_STATE.TODOS)) {
    throw new Error(`Error : ${func} - ${MESSAGE.NOT_TYPE_FUNCTION}`);
  }

  if (!state.hasOwnProperty(APP_STATE.SELECTED_TAB)) {
    throw new Error(`Error : ${func} - ${MESSAGE.NOT_TYPE_FUNCTION}`);
  }
};
