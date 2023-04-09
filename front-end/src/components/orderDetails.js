import PropTypes from 'prop-types';
import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
  TableFooter,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import getLocalStorage from '../services/getLocalStorage';
import setLocalStorage from '../services/setLocalStorage';
import getTotalPrice from '../utils/getTotalPrice';

const hoverSX = {
  textAlign: 'center',
  '&:hover': {
    backgroundColor: 'rgba(50, 201, 245, 0.2)',
  },
};

export default class OrderDetails extends React.Component {
  state = {
    carProducts: [],
    total: '',
  };

  componentDidMount() {
    const { orderProducts, totalOrder } = this.props;
    const newOrderProducts = orderProducts || getLocalStorage('carrinho', []);
    const total = totalOrder || getTotalPrice();
    this.setState({ carProducts: newOrderProducts, total });
  }

  removeItem(id) { // se o quantity for 0 ele remove
    const { setCarValue } = this.props;

    const carProducts = getLocalStorage('carrinho', []);
    const newProducts = carProducts.filter((p) => p.id !== id);

    setLocalStorage('carrinho', newProducts);

    const total = getTotalPrice();

    this.setState({ carProducts: newProducts, total });
    setCarValue(total);
  }

  render() {
    const { history } = this.props;
    const { carProducts, total } = this.state;

    const pathName = history.location.pathname.split('/');

    //  faz o data-testid ficar dinamico
    const COSTUMER = pathName[2] === 'checkout'
      ? `${pathName[1]}_checkout__`
      : `${pathName[1]}_order_details__`;

    const ELEMENTORDER = 'element-order';

    const customerCheckoutPath = pathName[1] === 'customer' && pathName[2] === 'checkout';
    const checkCol = { fontSize: '1.4em' };
    return (
      <TableContainer
        component={ Paper }
        sx={ { width: 'auto', m: 'auto', maxHeight: 400 } }
      >
        <Table stickyHeader sx={ { width: '100%' } }>
          <TableHead>
            <TableRow>
              <TableCell
                sx={ { textAlign: 'center', fontWeight: 'bold' } }
                component="th"
              >
                Item
              </TableCell>
              <TableCell
                sx={ { textAlign: 'center', fontWeight: 'bold' } }
                component="th"
              >
                Descrição
              </TableCell>
              <TableCell
                sx={ { textAlign: 'center', fontWeight: 'bold' } }
                component="th"
              >
                Quantidade
              </TableCell>
              <TableCell
                sx={ { textAlign: 'center', fontWeight: 'bold' } }
                component="th"
              >
                Valor Unitário
              </TableCell>
              <TableCell
                sx={ { textAlign: 'center', fontWeight: 'bold' } }
                component="th"
              >
                Sub-total
              </TableCell>
              {customerCheckoutPath && (
                <TableCell
                  align="center"
                  component="th"
                  sx={ { fontWeight: 'bold' } }
                >
                  Remover Item
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {carProducts?.map((product, index) => (
              <TableRow key={ index } sx={ hoverSX }>
                <TableCell
                  sx={ {
                    textAlign: 'center',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2em',
                  } }
                  data-testid={
                    `${COSTUMER}${ELEMENTORDER}-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={ { textAlign: 'center', fontWeight: 'bold' } }
                  data-testid={ `${COSTUMER}${ELEMENTORDER}-table-name-${index}` }
                >
                  {product.title ? product.title : product.name}
                </TableCell>
                <TableCell
                  sx={ { textAlign: 'center', fontWeight: 'bold' } }
                  data-testid={ `${COSTUMER}${ELEMENTORDER}-table-quantity-${index}` }
                >
                  {product.quantity}
                </TableCell>
                <TableCell
                  sx={ { textAlign: 'center', fontWeight: 'bold' } }
                  data-testid={ `${COSTUMER}${ELEMENTORDER}-table-unit-price-${index}` }
                >
                  { (+product.price)
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
                </TableCell>
                <TableCell
                  sx={ { textAlign: 'center', fontWeight: 'bold' } }
                  data-testid={ `${COSTUMER}${ELEMENTORDER}-table-sub-total-${index}` }
                >
                  {Number(product.price * product.quantity)
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                {customerCheckoutPath && (
                  <TableCell
                    align="center"
                    data-testid={ `${COSTUMER}${ELEMENTORDER}-table-remove-${index}` }
                  >
                    <Button
                      startIcon={ <DeleteIcon /> }
                      variant="contained"
                      color="error"
                      type="button"
                      onClick={ () => this.removeItem(product.id) }
                    >
                      Remover
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow
              stickyHeader
              data-testid={
                `${COSTUMER}${ELEMENTORDER}-total-price`
              }
            >
              <TableCell colSpan={ 2 } />
              <TableCell
                align="right"
                colSpan={ 2 }
                sx={ checkCol }
              />
              <TableCell
                align="center"
                colSpan={ 1 }
                sx={ { fontSize: '1.4em', color: 'primary.main' } }
              >
                Total: R$
                {(+total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }
}

OrderDetails.propTypes = {
  history: PropTypes.shape.isRequired,
  orderProducts: PropTypes.shape.isRequired,
  totalOrder: PropTypes.shape.isRequired,
  setCarValue: PropTypes.shape.isRequired,
};
