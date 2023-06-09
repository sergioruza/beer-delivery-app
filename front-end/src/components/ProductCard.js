import PropTypes from 'prop-types';
import React from 'react';
import getLocalStorage from '../services/getLocalStorage';
import setLocalStorage from '../services/setLocalStorage';
import getTotalPrice from '../utils/getTotalPrice';
import '../css/Products/ProductCard.css';

class ProductCard extends React.Component {
  state = {
    counter: 0,
  };

  componentDidMount() {
    const { id } = this.props;
    const carProducts = getLocalStorage('carrinho', []);
    const product = carProducts.find((p) => p.id === id);
    if (product) this.setState({ counter: product.quantity });
  }

  updateCar = () => {
    const { price, img, title, id, setCarValue } = this.props;
    const { counter } = this.state;

    const newProduct = { price, img, title, id, quantity: counter };

    const carProducts = getLocalStorage('carrinho', []);
    const index = carProducts.findIndex((p) => p.id === id);

    if (counter === 0) { // se o quantity for 0 ele remove
      carProducts.splice(index, 1);
    } else if (index < 0) { // se nao exister ele cria um produto novo no carrinho
      carProducts.push(newProduct);
    } else { // se ja existir ele atualiza a quantity do produto
      carProducts[index] = newProduct;
    }

    setLocalStorage('carrinho', carProducts);
    setCarValue(getTotalPrice().toFixed(2));
  };

  increment = (coun) => {
    if (coun < 100) this.setState({ counter: coun }, () => this.updateCar());
  };

  decrement = (counter) => {
    if (counter > (0 - 1)) this.setState({ counter }, () => this.updateCar());
  };

  handleChangeCounter = ({ target: { value } }) => {
    if (value < 100) this.setState({ counter: Number(value) }, () => this.updateCar());
  };

  render() {
    const { counter } = this.state;
    const { price, img, title, id } = this.props;

    const ROUTE = 'customer_products';

    return (
      <div className="product-card">
        <img
          className="product-img"
          width={ 200 }
          data-testid={ `${ROUTE}__img-card-bg-image-${id}` }
          src={ img }
          alt={ `${title}-img` }
        />
        <div className="product-title-div">
          <span
            className="product-title"
            data-testid={ `${ROUTE}__element-card-title-${id}` }
          >
            {title}

          </span>
        </div>
        <div className="quantity-price-div">
          <div className="buttons-div">
            <button
              className="product-btn"
              data-testid={ `customer_products__button-card-rm-item-${id}` }
              onClick={ () => this.decrement(counter - 1) }
              type="button"
            >
              -
            </button>
            <input
              name="counter"
              onChange={ this.handleChangeCounter }
              className="product-input"
              max="99"
              min="0"
              type="number"
              data-testid={ `customer_products__input-card-quantity-${id}` }
              value={ counter }
            />

            <button
              className="product-btn"
              data-testid={ `customer_products__button-card-add-item-${id}` }
              onClick={ () => this.increment(counter + 1) }
              type="button"
            >
              +
            </button>
          </div>
          <span
            className="product-price"
            data-testid={ `${ROUTE}__element-card-price-${id}` }
          >
            R$
            {' '}
            {Number(price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  img: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  setCarValue: PropTypes.func.isRequired,
};

export default ProductCard;
