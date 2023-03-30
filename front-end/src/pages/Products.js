import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from '../components';
import getLocalStorage from '../services/getLocalStorage';
import ProductCard from '../components/ProductCard';
import { AppConsumer } from '../context/appContext';

export default class Products extends Component {
  state = {
    carValue: 0,
  };

  // componentDidMount() {
  //   const products = getLocalStorage('carrinho', []);
  //   const valuesSum = products.map((e) => e.price * e.quantity);
  //   const total = valuesSum.reduce((cur, acc) => acc + cur, 0);
  //   this.setState({ carValue: total });
  // }

  sumProducts = () => {
    const products = getLocalStorage('carrinho', []);
    const valuesSum = products.map((e) => e.price * e.quantity);
    const total = valuesSum.reduce((cur, acc) => acc + cur, 0);
    setCarValue(total);
  };

  render() {
    this.forceUpdate(this.sumProducts);
    const { history } = this.props;
    const { carValue } = this.state;
    const type = history.location.pathname.split('/')[1];
    const username = getLocalStorage('user', { name: 'Matheus' });
    // console.log(type);
    return (
      <AppConsumer>
        {({ listProducts, setCarValue }) => (
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
                  {carValue}
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
