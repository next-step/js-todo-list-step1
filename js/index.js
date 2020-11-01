import App from "./components/App.js"
import { EVENT, SELECTOR } from "./utils/constants.js"


document.addEventListener(EVENT.DOM_LOADED,() => {
    new App(SELECTOR.TODO_APP)
})