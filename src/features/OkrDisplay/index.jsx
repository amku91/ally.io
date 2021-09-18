import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDataAsync,
  okrFetchData,
  okrIsLoading,
  clickedRowData,
  isErrorLogged
} from './displaySlice';
import './style.css';
import { OkrArrow } from '../../components/OkrArrow/index';
import { OkrTile } from '../../components/OkrTile/index';
import { OkrIcon } from '../../components/OkrIcon/index';
import { AllyLoader } from '../../components/AllyLoader';
// import PropTypes from 'prop-types';
import { OkrBox } from '../../components/OkrBox/index';
import { OkrFilter } from '../../components/OkrFilter';
import { OkrDialog } from '../../components/OkrDialog';


/**
 * @name OkrBaseDisplay
 * @description OKR base display feature component
 * @returns Base of OKR component
 */

export function OkrBaseDisplay() {
  const okrData = useSelector(okrFetchData);
  const isLoading = useSelector(okrIsLoading);
  const isError = useSelector(isErrorLogged);
  const dispatch = useDispatch();
  const [clickedRow, setClickedRow] = useState({});


  //To handle show/hide logic
  const handleRowClick = (key) => {
    let tempRows = { ...clickedRow };
    if (tempRows[key]) {
      delete tempRows[key];
    } else {
      tempRows[key] = 1;
    }
    setClickedRow(tempRows)
  };

  useEffect(() => {
    /**
     * Fetch OKR data from server on component mount
     * Adding set timeout so loader can be visible only for view purpose
     */
    setTimeout(() => {
      dispatch(fetchDataAsync(new Date().getTime()));
    }, 100);
    //dispatch(fetchDataAsync(new Date().getTime()));
  }, [dispatch]);

  return (
    <div className="okr-display">
      <div className="okr-container">
        {isLoading !== 'idle' ?
          <AllyLoader
            showMessage={true}
            message={"Loading OKRs..."}
          />
          : isError ? 
          <div className="okr-filter-error">Sorry, Something went wrong. Please try after some time.</div> 
          :
          <Fragment>
            <div className="okr-filter-container">
              <OkrFilter />
              <OkrDialog />
            </div>
            {okrData.map((item, key) => {
              return (
                <div className="display-box-container" key={`parent-${item.id}-${key}`}>
                  <div className="display-box-first" onClick={event => handleRowClick(key)}>
                    <OkrArrow
                      direction={clickedRow[key] ? 'up' : 'down'}
                    />
                  </div>

                  <div className="display-box-second">
                    <div className="tile-box">
                      <div>
                        <OkrIcon />
                      </div>
                      <div className="tile-text" onClick={event => dispatch(clickedRowData({ ...item }))}>
                        <OkrTile
                          title={item.title}
                          orderKey={key}
                          mode={'parent'}
                        />
                      </div>
                    </div>
                    <div>
                      {!clickedRow[key] ?
                        <OkrBox
                          parentData={item}
                          childData={item.childNodes ? item.childNodes : []}
                        />
                        : ''}
                    </div>
                  </div>
                </div>
              );
            })}
          </Fragment>
        }
      </div>
    </div>
  );
}

OkrBaseDisplay.propTypes = {};

OkrBaseDisplay.defaultProps = {};
