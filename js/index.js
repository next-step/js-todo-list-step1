import App from "./components/App.js"
import { EVENT, SELECTOR } from "./utils/constant.js"


document.addEventListener(EVENT.DOM_LOADED,() => {
    new App(SELECTOR.TODO_APP)
})