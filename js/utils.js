export const generateId = () =>
  Array(16)
    .fill()
    .map((_) => "0123456789ABCDEF"[(Math.random() * 16) | 0])
    .join("");
