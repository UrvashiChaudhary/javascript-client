import React from 'react';
import { Mutation } from '@apollo/react-components';
import { LOGIN_USER } from './mutation';
import Login from './Login';

console.log('LOGIN_USER', LOGIN_USER);
export default () => (
  <Mutation mutation={LOGIN_USER}>
    {(loginUser) => (
      <>
        <Login loginUser={loginUser} />
      </>
    )}
  </Mutation>
);
