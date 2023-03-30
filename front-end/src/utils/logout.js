const logout = (history) => {
  localStorage.removeItem('user');
  history.push('/login');
};

export default logout;
