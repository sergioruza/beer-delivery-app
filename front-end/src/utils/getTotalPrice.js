import getLocalStorage from '../services/getLocalStorage';

const getTotalPrice = () => {
  const carProducts = getLocalStorage('carrinho', []);
  const total = carProducts.map(({ price, quantity }) => price * quantity)
    .reduce((acc, value) => acc + value, 0);
  return total;
};

export default getTotalPrice;
