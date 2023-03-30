import React, { Component } from 'react';
import propTypes from 'prop-types';
import produtos from './mockProducts';

const AppContext = React.createContext();

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

class Provider extends Component {
  state = {
    listProducts: produtos,
  };

  setData = (listProducts) => {
    this.setState(() => ({ listProducts }));
  };

  render() {
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
