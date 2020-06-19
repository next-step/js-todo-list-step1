import App from "./App.js"

try {
  new App({ title: 'TODOS', selector: '.todoapp'})
} catch(e) {
  console.error(e)
}
