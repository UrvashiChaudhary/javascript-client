import React from 'react';
import PropTypes from 'prop-types';
import { Error, Input } from './style';

const TextField = (props) => {
  const {
    value, disabled, error, onChange, onBlur,
  } = props;
  return (
    <>
      <Input type="text" value={value} error={error} disabled={disabled} onChange={onChange} onBlur={onBlur} />
      <Error>{error}</Error>
    </>
  );
};
export default TextField;
TextField.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.string.isRequired,
};
TextField.defaultProps = {
  disabled: false,
  error: '',
  onChange: '',
};
