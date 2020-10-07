import React, { useCallback } from "react";

import { Button } from '@material-ui/core';

const Category = ({ category, deleteCategory }) => {
  const handleDelete = useCallback(
    (e) => deleteCategory(category),
    [deleteCategory, category]
  );

  return (
    <div className='category-box'>

      <div className='category'>{category.name}</div>
      <div>
        <Button onClick={handleDelete} variant='outlined'>Delete</Button>
      </div>
    </div>
  );
};

export default Category;