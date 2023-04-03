import React, { Component } from 'react';
import propTypes from 'prop-types';
// import produtos from './mockProducts';
import { getProducts } from '../services/requests';
import getTotalPrice from '../utils/getTotalPrice';

const AppContext = React.createContext();

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

class Provider extends Component {
  state = {
    listProducts: [],
    carValue: 0,
  };

  getAllProducts = async () => {
    const { listProducts } = this.state;
    if (listProducts.length === 0) {
      const carValue = getTotalPrice().toFixed(2);
      const allProducts = await getProducts();
      this.setState({ listProducts: allProducts, carValue });
    }
  };

  setCarValue = (newValue) => { this.setState(() => ({ carValue: newValue })); };

  render() {
    this.getAllProducts();
    const { children } = this.props;
    const { listProducts, carValue } = this.state;
    const { setCarValue } = this;

    return (
      <AppProvider value={ { listProducts, carValue, setCarValue } }>
        { children }
      </AppProvider>
    );
  }
}
Provider.propTypes = {
  children: propTypes.func.isRequired,
};
export default AppContext;
export { Provider };
