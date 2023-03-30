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
  };

  products = async () => {
    const { listProducts } = this.state;
    if (listProducts.length === 0) {
      const data = await getProducts();
      this.setData(data);
    }
  };

  setData = (listProducts) => {
    this.setState(() => ({ listProducts }));
  };

  render() {
    this.products();
    const { children } = this.props;
    const { listProducts } = this.state;
    const { setData } = this;

    return (
      <AppProvider value={ { listProducts, setData } }>
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
