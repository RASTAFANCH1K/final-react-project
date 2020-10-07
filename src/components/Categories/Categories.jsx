import React, { useState, useCallback,useEffect } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

import * as categoryActions from '../../store/actions/categoryActions';
import Category from "../Category/Category";

const Categories = () => {
  const initialState = { name: "" };
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const authSelector = useSelector(selector => selector.authReducer, shallowEqual);
  const categorySelector = useSelector(selector => selector.categoryReducer, shallowEqual);
  const toySelector = useSelector(selector => selector.toyReducer, shallowEqual);


  useEffect(() => {
    dispatch(categoryActions.getCategories(authSelector.token));
  }, [dispatch, authSelector.token]);

  const addCategory = useCallback(
    (e) => {
      e.preventDefault();

      if (
        authSelector.token &&
        state.name &&
        !categorySelector.list.some((c) => c.name === state.name)
      ) {
        dispatch(categoryActions.addCategory(authSelector.token, state.name));
        setState(initialState);
      }
    },
    [state, setState, initialState, dispatch, authSelector, categorySelector]
  );

  const deleteCategory = useCallback(
    (category) => {
      if (authSelector.token) {
        const used = toySelector.list
          .map((t) => t.category)
          .some((c) => c.id === category.id);

        if (!used) {
          dispatch(categoryActions.deleteCategory(authSelector.token, category.id));
        }
      }
    },
    [dispatch, authSelector, toySelector]
  );

  const handleChange = useCallback(
    (e) =>
      setState({
        ...state,
        [e.target.name]: e.target.value,
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
            <Link className='link' to="/toys">Toys</Link>
          </li>
          <li>
            <Link className='link' to="/transactions">Transactions</Link>
          </li>
          <li>
            <Link className='link' to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <h2>Categories</h2>
      <h3>Category form</h3>
      <form method="POST" onSubmit={addCategory}>
        <TextField
          label='Category'
          name="name"
          value={state.name}
          onChange={handleChange}
          variant='outlined'
        />
        <Button variant='outlined' type="submit">Add</Button>
      </form>
      <h3>Created categories</h3>
      <ul>
        {categorySelector.list.map((c) => (
          <li key={c.id}>
            <Category
              category={c}
              deleteCategory={deleteCategory}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;