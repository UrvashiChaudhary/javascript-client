import React from 'react';
import PropTypes from 'prop-types';
import {
  Table as Tables, TableCell, TableContainer, TableHead, TableRow, Paper, withStyles, TableBody,
} from '@material-ui/core';

const useStyles = () => ({
  table: {
    minWidth: 650,
  },
  header: {
    color: 'grey',
  },

});

function Table(props) {
  const {
    classes, data, column,
  } = props;

  return (
    <TableContainer component={Paper}>
      <Tables className={classes.table}>
        <TableHead>
          <TableRow>
            {
              column.map((Data) => (
                <TableCell
                  className={classes.header}
                  align={Data.align}
                >
                  {Data.label || Data.field}
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ name, email }) => (
            <TableRow>
              <TableCell align={column[0].align}>
                {name}
              </TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Tables>
    </TableContainer>
  );
}
Table.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default withStyles(useStyles)(Table);
