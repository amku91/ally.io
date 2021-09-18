import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

/**
 * @name AllyTypography
 * @description Ally default typography. Only support div and span with variant title and subtitle
 * @param {*} props 
 * @returns Typography compoennt
 */

export function AllyTypography(props) {
  return (
    props.component === "div" ? <div className={props.variant}>{props.children}</div> : <span className={props.variant}>{props.children}</span>
  );
}

AllyTypography.propTypes = {
  component: PropTypes.oneOf(["div", "span"]),//Not defining all of typogrpahy only defined some of them
  variant: PropTypes.oneOf(['title', 'subtitle']),
  text: PropTypes.string
};

AllyTypography.defaultProps = {
  component: "div",
  variant: PropTypes.oneOf(['title']),
  text: ""
};
