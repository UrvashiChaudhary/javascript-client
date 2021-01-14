/* eslint-disable */
import {React, Component} from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import callApi from '../../../../libs/utils/api';
import { snackbarContext } from '../../../../contexts/index';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      loading: false,
    };
  }

  // onClickHandler = async (value) => {
  //   const { email, password } = this.state;
  //   await this.setState({
  //     disabled: true,
  //     loader: true,
  //   });
  //   const resp = await callApi({ email: email.trim(), password }, 'post', '/user/login/');
  //   if (resp.data.data && (resp.data.status === 200)) {
  //     window.localStorage.setItem('token', resp.data.data);
  //     this.setState({
  //       redirect: true,
  //       message: 'Successfully Login',
  //     }, () => {
  //       const { message } = this.state;
  //       value(message, 'success');
  //     });
  //   } else {
  //     this.setState({
  //       message: 'Email not Registered',
  //     }, () => {
  //       const { message } = this.state;
  //       value(message, 'error');
  //     });
  //   }
  // };

  onClickHandler = async (value) => {
    this.setState({
      loading: true,
    });
    console.log('valueeee', value);
    const { rmdata } = this.props;
    console.log('********', rmdata);
    let remData =Object.assign({}, ...rmdata);
    console.log('-----------------', remData.originalId);
    // console.log('Daaaataaa', rmdata);
    const response = await callApi(rmdata, 'delete', `/trainee?id=${remData.originalId}`);
    this.setState({ loading: false });
    if (response.data.status === 'OK') {
      this.setState({
        message: 'Deleted Successfully ',
      }, () => {
        const { message } = this.state;
        onSubmit(Data);
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
      openRemove, onClose, onSubmit, data,
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
              <Button onClick={() => this.onClickHandler(value)} color="primary" >
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
}

DeleteDialog.propTypes = {
  openRemove: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default DeleteDialog;

