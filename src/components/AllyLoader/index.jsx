import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

/**
 * @name AllyLoader
 * @description Default system loader
 * @param {*} showMessage boolean 
 * @param {*} message string  
 * @returns Loader Component
 */

export function AllyLoader({ showMessage, message }) {
  return (
    <div className="loader-container">
      <div className="ally-loader"><div></div><div></div><div></div></div>
      <div>{message}</div>
    </div>
  );
}

AllyLoader.propTypes = {
  showMessage: PropTypes.bool,
  message: PropTypes.string
};

AllyLoader.defaultProps = {
  showMessage: true,
  message: 'Loading...'
};
