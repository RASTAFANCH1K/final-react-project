import React, { useCallback } from "react";

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const Toy = ({ toy, deleteToy }) => {
  const { id, name, quantity, price, totalCost, description, category } = toy;

  const onDelete = useCallback(
    (e) => deleteToy(toy),
    [toy, deleteToy]
  );

  return (
    <TableRow>
      <TableCell>{ id }</TableCell>
      <TableCell>{ name }</TableCell>
      <TableCell>{ quantity }</TableCell>
      <TableCell>{ price }</TableCell>
      <TableCell>{ totalCost }</TableCell>
      <TableCell>{ description }</TableCell>
      <TableCell>{ category.id }</TableCell>
      <TableCell>{ category.name }</TableCell>
      <TableCell>{ <button onClick={onDelete}>Delete</button> }</TableCell>
    </TableRow>
  )
}

export default Toy;