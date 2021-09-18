import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';


/**
 * @name OkrArrow
 * @description OKR arrow component
 * @param {*} direction string 
 * @returns  Arrow Component
 */

export function OkrArrow({ direction }) {
  return (
    direction === 'up' ? <div className={"arrow-up"}></div> : <div className={"arrow-down"}></div>
  );
}

OkrArrow.propTypes = {
  direction: PropTypes.oneOf(['up', 'down'])
};

OkrArrow.defaultProps = {
  direction: 'up'
};
