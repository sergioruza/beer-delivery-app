import getLocalStorage from '../services/getLocalStorage';

const getTotalPrice = () => {
  const car = getLocalStorage('carrinho', []);
  const total = car.map((i) => i.price * i.quantity).reduce((a, b) => a + b, 0);
  return total;
};

export default getTotalPrice;
