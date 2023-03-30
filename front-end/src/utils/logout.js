const logout = (history) => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  history.push('/login');
};

export default logout;
