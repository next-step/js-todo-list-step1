import setEventAddCard from "./addCardEvent.js";
import renderCard from "./renderElement.js";
import localStorageInit from "./localStorageInit.js";
import setEventFilter from "./filter.js";
import setToggle from "./onCardEvent.js";
let init = () => {
  localStorageInit(); // DONE, TODO가 없는 경우 setItem
  renderCard(); // localstorage의 데이터를 랜더
  setEventAddCard(); // input값을 localStorage에 추가하는 Event할당
  setEventFilter(); // Filter Box에
  // setEventOncard();
  setToggle();
};

init();
