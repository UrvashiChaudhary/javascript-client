import React from 'react';
import Button from '@material-ui/core/Button';
import AddDialog from './components/AddDialog/AddDialog';
import { NavBar } from '../components';

export default class Trainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (userData) => {
    console.log('UserData', userData);
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    return (
      <>
        <NavBar />
        <br />
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>ADD TRAINEE</Button>
        <Button>
          <AddDialog open={open} onSubmit={this.handleSubmit} onClose={this.handleClose} />
        </Button>
      </>
    );
  }
}
