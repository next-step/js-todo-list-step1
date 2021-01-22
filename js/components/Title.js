import Reilly from "../lib/Reilly.js";

function Title({ children }) {
  return Reilly.createElement("h1", null, ...children);
}

export default Title;
