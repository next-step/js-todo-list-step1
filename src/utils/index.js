export const debounceFrameOf = callback => {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(), 1000 / 60);
  }
}