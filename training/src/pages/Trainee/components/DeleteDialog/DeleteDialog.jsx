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
import callApi from '../../../../libs/utils/api';
import { snackbarContext } from '../../../../contexts/index';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      loading: false,
    };
  }

  onClickHandler = async (value, e) => {
    this.setState({
      loading: true,
    });
    const { rmdata } = this.props;
    const response = await callApi(rmdata, 'delete', `/trainee?id=${rmdata.originalId}`);
    this.setState({ loading: false });
    if (response.statusText === 'OK') {
      this.setState({
        message: 'Deleted Successfully ',
      }, () => {
        const { message } = this.state;
        value(message, 'success');
      });
    } else {
      this.setState({
        message: 'Error While Deleting',
      }, () => {
        const { message } = this.state;
        value(message, 'error');
      });
    }
  }

  render() {
    const {
      openRemove, onClose, deleteData,
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
              {({value}) => (
                <Button onClick={() => this.onClickHandler(value, deleteData)
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
