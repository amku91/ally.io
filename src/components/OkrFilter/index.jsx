import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  applyFilter,
  selectedFilter,
  filterArray
} from '../../features/OkrDisplay/displaySlice';
import './styles.css';
//import PropTypes from 'prop-types';


/**
 * @name OkrFilter
 * @description OKR filter component
 * @returns OKR Filter Component
 */

export function OkrFilter() {
  const filter = useSelector(selectedFilter);
  const filterData = useSelector(filterArray);
  const dispatch = useDispatch();

  return (
    <div>
      <label htmlFor="ok-filter" className="label">Choose a category:</label>
      <select
        name="okr_filters"
        id="ally_okr_filters"
        value={filter}
        onChange={event => dispatch(applyFilter(event.target.value))}
        className="select"
      >
        <option value={''}>All</option>
        {filterData.map((item, key) => {
          return (
            <option value={item} key={`okr-filter-${item}`}>{item}</option>
          );
        })}
      </select>
    </div>
  );
}

// OkrFilter.propTypes = {};

// OkrFilter.defaultProps = {};
