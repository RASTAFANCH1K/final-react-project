import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/authActions';
import * as mainActions from '../../store/actions/generalActions';
import * as toyActions from '../../store/actions/toyActions';

import Toy from '../Toy/Toy';

import { 
  TableContainer, 
  Paper,
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell
} from '@material-ui/core';

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const authSelector= useSelector(selector => selector.authReducer, shallowEqual);
  const toySelector = useSelector(selector => selector.toyReducer, shallowEqual);

  const deleteToy = useCallback(
    (toy) => {
      if (authSelector.token) {
        dispatch(toyActions.deleteToy(authSelector.token, toy.id));
      }
    },
    [dispatch, authSelector]
  );

  const onLogout = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(authActions.logout(authSelector.token));
      history.push('/login');
    },
    [dispatch, authSelector, history]
  );

  useEffect(() => {
    if (authSelector.token && !toySelector.list.length) {
      dispatch(mainActions.getData(authSelector.token));
    }
  }, [dispatch, authSelector, toySelector]);

  return (
    <div>
      <h2>Dashboard</h2>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total Cost</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category ID</TableCell>
              <TableCell>Category Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Array.isArray(toySelector.list) && toySelector.list.map(toy => {
                return (
                  <Toy
                    key={ toy.id }
                    toy={ toy }
                    deleteToy={deleteToy}
                  />
                )
              }) 
            }
          </TableBody>
        </Table>
      </TableContainer>
      <nav>
        <ul className='nav'>
          <li>
            <Link className='link' to="/toys">Toys</Link>
          </li>
          <li>
            <Link className='link' to="/transactions">Transactions</Link>
          </li>
          <li>
            <Link className='link' to="/categories">Categories</Link>
          </li>
          <li>
            <Link className='link' to="/about">About</Link>
          </li>
          <li>
            <Link className='link' to="/login" onClick={onLogout}>Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;