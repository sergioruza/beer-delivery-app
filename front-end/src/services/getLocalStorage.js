const getLocalStorage = (key, defaultValue) => {
  const userName = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key)) : defaultValue;
  return userName;
};

export default getLocalStorage;
