import React, { useState, useCallback } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { TextField, NativeSelect, InputLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';

import * as toyActions from '../../store/actions/toyActions';


const Toys = () => {
  const initialState = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
  };

  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const authSelector = useSelector(selector => selector.authReducer, shallowEqual);
  const categorySelector = useSelector(selector => selector.categoryReducer, shallowEqual);

  const onAddToy = useCallback(
    (e) => {
      e.preventDefault();

      if (
        authSelector.token &&
        state.name &&
        state.description &&
        state.price &&
        categorySelector.list.some((category) => category.name === state.category)
      ) {
        const toy = {
          name: state.name,
          description: state.description,
          price: state.price,
          quantity: state.quantity,
          totalCost: state.price * state.quantity,
          category: categorySelector.list.find((category) => category.name === state.category),
        };

        dispatch(
          state.quantity
            ? toyActions.addToyWithTransaction(authSelector.token, toy)
            : toyActions.addToy(authSelector.token, toy)
        );
        setState(initialState);
      }
    },
    [state, setState, initialState, dispatch, authSelector, categorySelector]
  );

  const onChangeForm = useCallback(
    (e) =>
      setState({
        ...state,
        [e.target.name]:
          e.target.name === 'price' || e.target.name === 'quantity'
            ? parseInt(e.target.value) < 0
              ? 0
              : parseInt(e.target.value)
            : e.target.value,
      }),
    [state, setState]
  );

  return (
    <div>
      <nav>
        <ul className='nav'>
          <li>
            <Link className='link' to="/dashboard">Dashboard</Link>
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
        </ul>
      </nav>
      <h2>Toys</h2>
      <div className='toys-container'>
        <div>
          <h3>Add toy form</h3>
          <form method='POST' onSubmit={onAddToy}>
            <div>
              <TextField
                label='Name'
                name='name'
                value={state.name}
                onChange={onChangeForm}
                variant='outlined'
              />
            </div>
            <div>
              <TextField
                label='Description'
                name='description'
                value={state.description}
                onChange={onChangeForm}
                variant='outlined'
              />
            </div>
            <div>
              <TextField
                label='Price'
                type='number'
                name='price'
                value={state.price}
                onChange={onChangeForm}
                variant='outlined'
              />
            </div>
            <div>
              <TextField
                label='Quantity'
                type='number'
                name='quantity'
                value={state.quantity}
                onChange={onChangeForm}
                variant='outlined'
              />
            </div>
            <div>
              <InputLabel id="categories">Categories</InputLabel>
              <NativeSelect
                id='categories'
                name='category'
                value={state.category}
                onChange={onChangeForm}
              >
                <option key='none' value=''></option>
                {categorySelector.list.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </NativeSelect>
            </div>
            <button type='submit'>Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Toys;