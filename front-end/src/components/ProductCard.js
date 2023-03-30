import PropTypes from 'prop-types';
import React from 'react';

class ProductCard extends React.Component {
  render() {
    // FALTA CRIAR BOTOES DE ADICIONAR CARRINDO, E MOSTRAR QUANTITY
    const { price, img, title, id } = this.props;
    const ROUTE = 'customer_products';
    return (
      <div>
        <span data-testid={ `${ROUTE}__element-card-price-${id}` }>{price}</span>
        <img
          data-testid={ `${ROUTE}__img-card-bg-image-${id}` }
          src={ img }
          alt={ `${title}-img` }
        />
        <span data-testid={ `${ROUTE}__element-card-title-${id}` }>{title}</span>
      </div>
    );
  }
}

ProductCard.propTypes = {
  img: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProductCard;
