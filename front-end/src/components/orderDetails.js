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
  Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import getLocalStorage from '../services/getLocalStorage';
import setLocalStorage from '../services/setLocalStorage';
import getTotalPrice from '../utils/getTotalPrice';

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

    return (
      <Container>
        <TableContainer component={ Paper }>
          <Table>
            <TableHead>
              <TableCell
                sx={ { textAlign: 'center' } }
                component="th"
              >
                Item
              </TableCell>
              <TableCell
                sx={ { textAlign: 'center' } }
                component="th"
              >
                Descrição
              </TableCell>
              <TableCell
                sx={ { textAlign: 'center' } }
                component="th"
              >
                Quantidade
              </TableCell>
              <TableCell
                sx={ { textAlign: 'center' } }
                component="th"
              >
                Valor Unitário
              </TableCell>
              <TableCell
                sx={ { textAlign: 'center' } }
                component="th"
              >
                Sub-total
              </TableCell>
              {customerCheckoutPath && <TableCell component="th">Remover Item</TableCell>}
            </TableHead>
            <TableBody>
              {carProducts?.map((product, index) => (
                <TableRow key={ index } sx={ { textAlign: 'center' } }>
                  <TableCell
                    sx={ { textAlign: 'center' } }
                    data-testid={
                      `${COSTUMER}${ELEMENTORDER}-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={ { textAlign: 'center' } }
                    data-testid={ `${COSTUMER}${ELEMENTORDER}-table-name-${index}` }
                  >
                    {product.title}
                  </TableCell>
                  <TableCell
                    sx={ { textAlign: 'center' } }
                    data-testid={ `${COSTUMER}${ELEMENTORDER}-table-quantity-${index}` }
                  >
                    {product.quantity}
                  </TableCell>
                  <TableCell
                    sx={ { textAlign: 'center' } }
                    data-testid={ `${COSTUMER}${ELEMENTORDER}-table-unit-price-${index}` }
                  >
                    { (+product.price)
                      .toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
                  </TableCell>
                  <TableCell
                    sx={ { textAlign: 'center' } }
                    data-testid={ `${COSTUMER}${ELEMENTORDER}-table-sub-total-${index}` }
                  >
                    {Number(product.price * product.quantity)
                      .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  {customerCheckoutPath && (
                    <TableCell
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
          </Table>
        </TableContainer>
        <div>
          Total: R$
          <span data-testid={ `${COSTUMER}${ELEMENTORDER}-total-price` }>
            {(+total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

      </Container>
    );
  }
}

OrderDetails.propTypes = {
  history: PropTypes.shape.isRequired,
  orderProducts: PropTypes.shape.isRequired,
  totalOrder: PropTypes.shape.isRequired,
  setCarValue: PropTypes.shape.isRequired,
};
