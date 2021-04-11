import { STORAGE_KEY } from './constant.js';

export const getElement = (selector) => document.querySelector(selector);
export const saveData = (data) => localStorage.setItem(STORAGE_KEY.TODOLIST, JSON.stringify(data));
export const loadData = () => JSON.parse(localStorage.getItem(STORAGE_KEY.TODOLIST));