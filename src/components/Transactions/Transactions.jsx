import React, { useCallback } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import * as transactionActions from '../../store/actions/transactionActions';

import TransactionAddForm from '../TransactionForm/TransactionForm';

import { 
  TableContainer, 
  Paper,
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell
} from '@material-ui/core';

const Transactions = () => {
  const dispatch = useDispatch();

  const authSelector = useSelector(selector => selector.authReducer, shallowEqual);
  const toySelector = useSelector(selector => selector.toyReducer, shallowEqual);
  const transactionSelector = useSelector(selector => selector.transactionReducer, shallowEqual);

  const onAddTransaction = useCallback(
    (txRequest) => {
      if (authSelector.token) {
        dispatch(transactionActions.addTransaction(authSelector.token, txRequest));
      }
    },
    [dispatch, authSelector]
  );

  return (
    <div>
      <nav>
        <ul className='nav'>
          <li>
            <Link className='link' to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link className='link' to="/toys">Toys</Link>
          </li>
          <li>
            <Link className='link' to="/categories">Categories</Link>
          </li>
          <li>
            <Link className='link' to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <h2>Transactions</h2>
      <h3>Transaction form</h3>
      <TransactionAddForm
        toys={toySelector.list}
        onAddTransaction={onAddTransaction}
      />
      <h3>Transactios</h3>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Person</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionSelector.list.map((transaction) => (
              <TableRow
                key={transaction.id}
              >
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.userId}</TableCell>
                <TableCell>{transaction.toys.reduce((acc, el) => acc + el.quantity, 0)}</TableCell>
                <TableCell>
                  {transaction.toys.map((trx) => trx.totalCost).reduce((a, b) => a + b, 0)}
                </TableCell>
                <TableCell style={{color: transaction.type === 'incoming' ? 'green' : 'red'}}>{transaction.type === 'incoming' ? "incoming" : "outcoming"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Transactions;
