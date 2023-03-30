import React, { Component } from 'react';
import propTypes from 'prop-types';
// import produtos from './mockProducts';
import { getProducts } from '../services/requests';

const AppContext = React.createContext();

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

class Provider extends Component {
  state = {
    listProducts: [],
    orderDetails: [],
    carValue: 0,
  };

  products = async () => {
    const { listProducts } = this.state;
    if (listProducts.length === 0) {
      const data = await getProducts();
      this.setData(data);
    }
  };

  setCarValue = (value) => {
    this.setState(() => ({ carValue: value }));
  };

  setData = (listProducts) => {
    this.setState(() => ({ listProducts }));
  };

  setOrderDetails = (orderDetails) => {
    this.setState(() => ({ orderDetails }));
  };

  render() {
    this.products();
    const { children } = this.props;

    const { listProducts, carValue } = this.state;
    const { setData, setCarValue } = this;

    return (
      <AppProvider value={ { listProducts, setData, carValue, setCarValue } }>
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
