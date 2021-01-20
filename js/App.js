import Reilly from "./lib/Reilly.js";

class App extends Reilly.Component {
  constructor() {
    super();
  }

  render() {
    return Reilly.createElement(
      "div",
      { className: "todoApp" },
      Reilly.createElement("h1", null, "Simple View Library, Reilly"),
      Reilly.createElement(
        "ol",
        null,
        ...[
          `Documetation is WIP`,
          `simple implemetation humbly inspired by react`,
          `eager-JSX`
        ].map((v, i) =>
          Reilly.createElement("li", { className: `list-item ${i}` }, String(v))
        )
      )
    );
  }
}

export default App;
