import setEventAddCard from "./setEventAddCard.js";
import renderCard from "./renderElement.js";
import localStorageInit from "./localStorageInit.js";
import setEventFilter from "./setEventFilterBtn.js";
import setEventCheckBox from "./setEventCheckBox.js";
import counter from "./setEventCounter.js";
let init = () => {
  localStorageInit(); // DONE, TODO가 없는 경우 setItem
  renderCard(); // localstorage의 데이터를 랜더
  // setEventCheckBox();
  setEventAddCard(); // input값을 localStorage에 추가하는 Event할당
  setEventFilter(); // Filter Box에
};

init();
