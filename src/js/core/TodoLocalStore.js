//아직 쓰이지 않음
import { FILTER_TYPES } from '../../utils/const.js';
export default function TodoLocalStore() {
  this.setState = (nextState) => {
    this.state = nextState;
  };
  this.setItems = (newState) => {
    this.state = { ...this.state, ...newState };
    // localStorage.clear();
    // localStorage.removeItem('state');
    localStorage.setItem('state', JSON.stringify(this.state));
  };
  this.getItems = () => {
    const initialDtate = {
      todoes: [
        {
          idx: 0,
          content: 'Hi Every One',
          state: '',
        },
        {
          idx: 1,
          content: 'Im Tami',
          state: '',
        },
      ],
      todoesFiltered: [],
      filterState: FILTER_TYPES.ALL,
      todoesCount: '0',
    };
    const localData = JSON.parse(localStorage.getItem('state'));
    return localData ? localData : initialDtate;
  };
}
