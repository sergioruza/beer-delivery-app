import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from '../components';
import getLocalStorage from '../services/getLocalStorage';

export default class Products extends Component {
  render() {
    const { history } = this.props;
    const type = history.location.pathname.split('/')[1];
    const username = getLocalStorage('user', { name: 'Matheus' });
    // console.log(type);

    return (
      <div>
        <Header userName={ username.name } type={ type } history={ history } />
      </div>

    );
  }
}

Products.propTypes = {
  history: PropTypes.shape.isRequired,
};
