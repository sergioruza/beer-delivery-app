const logout = (history) => {
  localStorage.removeItem('user');
  localStorage.removeItem('carrinho');
  history.push('/login');
};

export default logout;
