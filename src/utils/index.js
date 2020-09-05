const ONE_FRAME = 1000 / 60;
export const debounceOneFrame = callback => {
  let target = null;
  return () => {
    clearTimeout(target);
    target = setTimeout(() => callback(), ONE_FRAME);
  }
};