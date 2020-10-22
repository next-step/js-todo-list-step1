function App() {
  if (!(this instanceof App)) {
    throw new Error("error: App must be called with new!");
  }
}

new App();
