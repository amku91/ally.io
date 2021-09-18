import React from 'react';
import { getListLetterForOkr } from '../../utils/helper';
import './styles.css';
import { AllyTypography } from '../AllyTypography/index';
import PropTypes from 'prop-types';


/**
 * @name OkrTile
 * @description Single objective title component
 * @param {*} mode string parent/child 
 * @param {*} orderKey number
 * @param {*} title string
 * @returns 
 */
export function OkrTile({ mode, orderKey, title }) {
  return (
    <div key={mode + orderKey}>
      <AllyTypography variant={mode === 'parent' ? "title" : "subtitle"} component="span">{getListLetterForOkr(mode, orderKey)}.&nbsp;&nbsp;</AllyTypography>
      <AllyTypography variant={mode === 'parent' ? "title" : "subtitle"} component="span">{title}</AllyTypography>
    </div>
  );
}


OkrTile.propTypes = {
  mode: PropTypes.oneOf(['parent', 'child']),
  orderKey: PropTypes.number,
  title: PropTypes.string,
};

OkrTile.defaultProps = {
  mode: 'parent',
  orderKey: 0,
  title: '',
};
