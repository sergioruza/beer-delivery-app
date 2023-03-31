const logout = (history, type) => {
  localStorage.removeItem('user');
  localStorage.removeItem('carrinho');
  if (type !== 'login') history.push('/login');
};

export default logout;
