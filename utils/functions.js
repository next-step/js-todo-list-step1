import { KEYBOARD } from "./constants.js";

export const isEmpty = (value) =>
  value === "" || value === null || value === undefined;

export const isEnter = (value) => value === KEYBOARD.Enter;

export const isESC = (value) => value === KEYBOARD.ESC;
