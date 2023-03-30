import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from '../components';
import getLocalStorage from '../services/getLocalStorage';
import ProductCard from '../components/ProductCard';
import { AppConsumer } from '../context/appContext';

export default class Products extends Component {
  render() {
    const { history } = this.props;
    const type = history.location.pathname.split('/')[1];
    const username = getLocalStorage('user', { name: 'Matheus' });
    return (
      <AppConsumer>
        {({ listProducts, setCarValue, carValue }) => (
          <div>
            <Header userName={ username.name } type={ type } history={ history } />
            <section>
              {listProducts?.map(({ price, urlImage, name, id }) => (
                <ProductCard
                  setCarValue={ setCarValue }
                  key={ id }
                  price={ price }
                  img={ urlImage }
                  title={ name }
                  id={ id }
                />
              )) }
            </section>
            <button
              data-testid="customer_products__button-cart"
              type="button"
            >
              <div>
                Ver Carrinho: R$
                <span data-testid="customer_products__checkout-bottom-value">
                  {Number(carValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

            </button>
          </div>
        )}
      </AppConsumer>

    );
  }
}

Products.propTypes = {
  history: PropTypes.shape.isRequired,
};
