export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : [];
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
