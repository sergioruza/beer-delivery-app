import React, { Component } from 'react';
import propTypes from 'prop-types';
import produtos from './mockProducts';

const AppContext = React.createContext();

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

class Provider extends Component {
  state = {
    data: produtos,
  };

  setData = (data) => {
    this.setState(() => ({ data }));
  };

  render() {
    const { children } = this.props;
    const { data } = this.state;
    const { setData } = this;

    return (
      <AppProvider value={ { data, setData } }>
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
