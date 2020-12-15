import React from 'react';

import PropTypes from 'prop-types';

import { Error, Input } from './style';

const TextField = (props) => {
  const { value, disabled, error } = props;
  return (
    <>
      <Input type="text" value={value} disabled={disabled} error={error} />
      <Error>{error}</Error>
    </>
  );
};

export default TextField;

TextField.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.string,
  error: PropTypes.string,
};

TextField.defaultProps = {
  value: '',
  disabled: PropTypes.string,
  error: '',
};
