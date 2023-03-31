const getTotalPrice = (carProducts) => {
  const total = carProducts.map(({ price, quantity }) => price * quantity)
    .reduce((acc, value) => acc + value, 0);
  return total;
};

export default getTotalPrice;
