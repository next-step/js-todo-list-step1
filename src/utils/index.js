export const debounceOf = callback => {
  let target = null;
  return timer => {
    clearTimeout(target);
    target = setTimeout(callback, timer);
  }
};