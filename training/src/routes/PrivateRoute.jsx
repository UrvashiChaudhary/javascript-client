/* eslint-disable */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      localStorage.getItem('token')
        ? (
          <PrivateLayout>
            <Component {...matchProps} />
          </PrivateLayout>
        ) : (
          <Redirect to="/login/" />
        )
    )}
  />
);
PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
};
export default PrivateRoute;
