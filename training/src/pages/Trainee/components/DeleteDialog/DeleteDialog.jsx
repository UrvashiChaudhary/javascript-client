/* eslint-disable */
import { React, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { snackbarContext } from '../../../../contexts/index';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      loading: false,
    };
  }

  onClickHandler = async (openSnackBar, e) => {
    this.setState({
      loading: true,
    });
    const { deleteTrainee, refetch } = this.props;
     const { originalId: id } = e;
    const response = await deleteTrainee({variables: { id }});
    this.setState({ loading: false });
    if (response.data.rmdata !== 'undefined') {
      refetch();
      this.setState({
        message: 'Deleted Successfully ',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'Error While Deleting',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  render() {
    const {
      openRemove, onClose, rmdata,
    } = this.props;
    const { loading } = this.state;
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
                <Button onClick={() => this.onClickHandler(value, rmdata)
                }
                >
                  {loading && (
                <CircularProgress size={15} />
              )}
              {loading && <span>Deleting</span>}
              {!loading && <span>Delete</span>}
                </Button>
              )}

            </snackbarContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteDialog.propTypes = {
  openRemove: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteDialog;
