/* @jsx createElement */
import { createElement } from '../lib/React.js';

const ToggleAll = () => {
  return createElement("input", {
    className: "toggle-all",
    type: "checkbox"
  });
};

export default ToggleAll;