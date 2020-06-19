import App from "./App.js"

try {
  new App({ selector: '.todoapp'})
} catch(e) {
  console.error(e)
}
