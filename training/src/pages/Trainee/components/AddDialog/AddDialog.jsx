import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogContentText, DialogContent, DialogTitle, CircularProgress,
} from '@material-ui/core';
import { Email, Person, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import schema from './Schema';
import callApi from '../../../../libs/utils/api';
import { snackbarContext } from '../../../../contexts/index';
import Handler from './Handler';

const passwordStyle = () => ({
  passfield: {
    display: 'flex',
    flexdirection: 'row',
  },
  pass: {
    flex: 1,
  },
});

const constant = {
  name: Person,
  email: Email,
  password: VisibilityOff,
  'Confirm Password': VisibilityOff,
};

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      loading: false,
      hasError: false,
      message: '',
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  };

  onClickHandler = async (data, openSnackBar) => {
    this.setState({
      loading: true,
      hasError: true,
    });
    // eslint-disable-next-line react/prop-types
    const { refetch } = this.props;
    const response = await callApi(data, 'post', '/trainee');
    this.setState({ loading: false });
    if (response.statusText === 'OK') {
      refetch();
      this.setState({
        hasError: false,
        message: 'This is a success message',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        hasError: false,
        message: 'error in submitting',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  hasErrors = () => {
    try {
      schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  };

  getError = (field) => {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        schema.validateSyncAt(field, this.state);
        return '';
      } catch (err) {
        return err.message;
      }
    }
    return '';
  };

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  passwordType = (key) => {
    if (key === 'password' || key === 'Confirm Password') {
      return 'password';
    }
    return '';
  }

  formReset = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      touched: {},
    });
  }

  render() {
    const {
      open, onClose, classes,
    } = this.props;
    // eslint-disable-next-line no-shadow
    const {
    // eslint-disable-next-line no-shadow
      name, email, password, loading,
    } = this.state;
    const ans = [];
    Object.keys(constant).forEach((key) => {
      ans.push(<Handler
        label={key}
        onChange={this.handleChange(key)}
        onBlur={() => this.isTouched(key)}
        helperText={this.getError(key)}
        error={!!this.getError(key)}
        icons={constant[key]}
        type={this.passwordType(key)}
      />);
    });
    return (
      <>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"> Add Trainee </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your trainee Details
            </DialogContentText>
            <div>{ans[0]}</div>
            <br />
            <div>{ans[1]}</div>
            <br />
            <div className={classes.passfield}>
              <div className={classes.pass}>{ans[2]}</div>
              <br />
              <br />
              <div className={classes.pass}>{ans[3]}</div>
            </div>
            <br />
            <div align="right">
              <Button onClick={onClose} color="primary">CANCEL</Button>
              <snackbarContext.Consumer>
                {(value) => (
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={this.hasErrors()}
                    onClick={() => {
                      this.onClickHandler({
                        name, email, password,
                      }, value);
                      this.formReset();
                    }}
                  >
                    {loading && (
                      <CircularProgress size={15} />
                    )}
                    {loading && <span>Submitting</span>}
                    {!loading && <span>Submit</span>}
                  </Button>
                )}
              </snackbarContext.Consumer>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
export default withStyles(passwordStyle)(AddDialog);

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
