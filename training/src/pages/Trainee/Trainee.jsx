import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

// function Trainee(props) {
//   const { match: { path } } = props;
//   return (
//     <Switch>
//       <Route exact path={path} component={TraineeList} />
//       <Route exact path={`${path}/:traineeId`} component={TraineeDetail} />
//     </Switch>
//   );
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
        <br />
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>ADD TRAINEE</Button>
        <Button>
          <AddDialog open={open} onSubmit={this.handleSubmit} onClose={this.handleClose} />
        </Button>
      </>
    );
  }
}
Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default Trainee;
