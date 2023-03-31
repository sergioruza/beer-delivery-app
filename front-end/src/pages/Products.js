import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from '../components';
import ProductCard from '../components/ProductCard';
import { AppConsumer } from '../context/appContext';

export default class Products extends Component {
  render() {
    const { history } = this.props;
    return (
      <AppConsumer>
        {({ listProducts, setCarValue, carValue }) => (
          <div>
            <Header history={ history } />
            <button
              data-testid="customer_products__button-cart"
              onClick={ () => history.push('/customer/checkout') }
              disabled={ Number(carValue) === 0 }
              type="button"
            >
              <div>
                Ver Carrinho: R$
                <span data-testid="customer_products__checkout-bottom-value">
                  {Number(carValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </button>
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
          </div>
        )}
      </AppConsumer>

    );
  }
}

Products.propTypes = {
  history: PropTypes.shape.isRequired,
};
