/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Typography, CardContent, InputAdornment, Button, Avatar, Card, CssBaseline, withStyles,
  CircularProgress,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { Email, VisibilityOff, LockOutlined } from '@material-ui/icons';
import { schema } from '../../config/constants';
import { snackbarContext } from '../../contexts/index';

const Design = (theme) => ({
  icon: {
    background: 'red',
    marginLeft: theme.spacing(22),
    marginTop: theme.spacing(3),
  },
  main: {
    width: 400,
    marginTop: theme.spacing(25),
    marginLeft: theme.spacing(50),
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      disabled: true,
      redirect: false,
      email: '',
      password: '',
      touched: {
        email: false,
        password: false,
      },
    };
  }

  renderRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/trainee" />;
    }
    return '';
  };

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  };

    hasErrors = () => {
      try {
        schema.validateSync(this.state);
      } catch (err) {
        return true;
      }
      return false;
    }

    getError = (field) => {
      const { touched } = this.state;
      if (touched[field] && this.hasErrors()) {
        try {
          schema.validateSyncAt(field, this.state);
          return false;
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

    onClickHandler = async (value) => {
      const { email, password } = this.state;
      const { loginUser } = this.props;
      console.log('loginUser', loginUser);
      await this.setState({
        disabled: true,
        loader: true,
      });
      console.log('----------------------------');
      // const resp = await callApi({ email: email.trim(), password }, 'post', '/user/login/');
      const resp = await loginUser({ variables: { email, password } });
      console.log('respppppp', resp);
      // if (resp.data.data && (resp.data.status === 200)) {
      //   window.localStorage.setItem('token', resp.data.data);
      //   this.setState({
      //     redirect: true,
      //     message: 'Successfully Login',
      //   }, () => {
      //     const { message } = this.state;
      //     value(message, 'success');
      //   });
      // } else {
      //   this.setState({
      //     message: 'Email not Registered',
      //   }, () => {
      //     const { message } = this.state;
      //     value(JSON.stringify(message), 'error');
      //   });
      // }
    };

    render() {
      const { classes } = this.props;
      const { loader } = this.state;

      return (
        <>
          <div className={classes.main}>
            <CssBaseline />
            <Card open aria-labelledby="form-dialog-title">
              <Avatar className={classes.icon}>
                <LockOutlined />
              </Avatar>
              <Typography variant="h3" align="center">Login</Typography>
              <CardContent>
                <form>
                  <div>
                    <TextField
                      helperText={this.getError('email')}
                      error={!!this.getError('email')}
                      required
                      id="outlined-required"
                      label="Email Address"
                      defaultValue=" "
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange('email')}
                      onBlur={() => this.isTouched('email')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      type="password"
                      helperText={this.getError('password')}
                      error={!!this.getError('password')}
                      required
                      id="outlined-required"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange('password')}
                      onBlur={() => this.isTouched('password')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VisibilityOff />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
              &nbsp;
                  <div>
                    <snackbarContext.Consumer>
                      {(value) => (
                        <Button variant="contained" color="primary" onClick={() => this.onClickHandler(value)} disabled={this.hasErrors()} fullWidth>
                          {this.renderRedirect()}
                          <span>{loader ? <CircularProgress size={20} /> : ''}</span>
                          SIGN IN
                        </Button>
                      )}
                    </snackbarContext.Consumer>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </>
      );
    }
}
Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  loginUser: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(Design)(Login);
