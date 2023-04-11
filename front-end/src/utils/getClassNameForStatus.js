const getClassNameForStatus = (status) => {
  switch (status) {
  case 'Pendente':
    return 'pendente-status';
  case 'Preparando':
    return 'preparando-status';
  case 'Em Trânsito':
    return 'transito-status';
  default:
    return 'entregue-status';
  }
};

export default getClassNameForStatus;
