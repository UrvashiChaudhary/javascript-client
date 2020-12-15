import React from 'react';

import PropTypes from 'prop-types';

import { Error, Input } from './style';

const TextField = (props) => {
  const { value, error } = props;
  return (
    <>
      <Input type="text" value={value} error />
      <Error>{error}</Error>
    </>
  );
};

export default TextField;

TextField.propTypes = {
  value: PropTypes.string,
  error: PropTypes.string,
};

TextField.defaultProps = {
  value: '',
  error: '',
};
