import { createElement } from "../lib/Reilly.js";

function Title({ children }) {
  return createElement("h1", null, ...children);
}

export default Title;
