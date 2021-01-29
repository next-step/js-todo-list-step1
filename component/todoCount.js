import { todoCountEl } from "./constant.js";

export const handleCount = (length) => {
  todoCountEl.innerHTML = `총 <strong>${length}</strong> 개`;
};
