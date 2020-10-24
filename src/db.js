export const getData = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
};

export const saveData = (key) => (data) =>
  localStorage.setItem(key, JSON.stringify(data));
