import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import { snackbarContext } from '../../../../contexts/index';

const useStyles = () => ({
  button_color: {
    backgroundColor: 'blue',
    color: 'white',
  },
});

function DeleteDialog(props) {
  const {
    openRemove, onClose, remove, classes,
  } = props;
  return (
    <div width="50%">
      <Dialog
        open={openRemove}
        variant="outlined"
        color="primary"
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to remove Trainee ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <snackbarContext.Consumer>
            {(value) => (
              <Button onClick={() => remove(value)} color="primary" autoFocus className={classes.button_color}>
                Delete
                {/* onClick={remove} */}
              </Button>
            )}
          </snackbarContext.Consumer>
        </DialogActions>
      </Dialog>
    </div>
  );
}
DeleteDialog.propTypes = {
  openRemove: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(DeleteDialog);
