const getOrderType = (type) => {
  if (type === 'customer') return 'MEUS PEDIDOS';
  if (type === 'seller') return 'PEDIDOS';
  return 'GERENCIAR USUÁRIOS';
};

export default getOrderType;
