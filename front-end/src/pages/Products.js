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
    // console.log(type);

    return (
      <AppConsumer>
        {({ listProducts }) => (
          <div>
            <Header userName={ username.name } type={ type } history={ history } />
            <section>
              {listProducts?.map(({ price, urlImage, name, id }) => (
                <ProductCard
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
              <p data-testid="customer_products__checkout-bottom-value">
                Ver Carrinho: R$ 28,46
              </p>

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
