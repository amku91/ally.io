import React from 'react';
import PropTypes from 'prop-types';
import { ICON8_HELP_ICON, ICON8_ACCOUNT_URL } from '../../utils/constant';
import './styles.css';


/**
 * @name OkrIcon
 * @description OKR icon render component
 * @param {*} param0 
 * @returns OKR Icon Component
 */
export function OkrIcon({ icon, width }) {
  return (
    <div className={`img-cotainer-${width}`}>
      <img src={icon === "account" ? ICON8_ACCOUNT_URL : ICON8_HELP_ICON} className="img" alt={icon === "account" ? "OKR Account" : "OKR Information"} />
    </div>
  );
}


OkrIcon.propTypes = {
  icon: PropTypes.oneOf(["help", "account"]),
  width: PropTypes.oneOf([16, 32])
};

OkrIcon.defaultProps = {
  icon: "account",
  width: 32
};
