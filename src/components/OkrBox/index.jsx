import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import './styles.css';
import PropTypes from 'prop-types';
import { OkrTile } from '../OkrTile';
import { OkrIcon } from '../OkrIcon';
import { clickedRowData } from '../../features/OkrDisplay/displaySlice';


/**
 * @name OkrBox
 * @description OKR timeline box widget
 * @param {*} parentData Parent object data 
 * @param {*} childData Child object data 
 * @returns OKR Timeline Component
 */

export function OkrBox({ parentData, childData }) {
  const dispatch = useDispatch();
  //chekc for array data whether its a valid array or not
  childData = Array.isArray(childData) && childData.length > 0 ? childData : [];
  let length = childData.length;

  return (
    <div className="timeline">
      <div className="box">{childData.length === 0 ?
        <div>No child okr found.</div> :
        <div className="container">
          <div className="lines">
            {childData.map((childNode, key) => {
              return (
                <Fragment key={`child-line-${childNode.id}`}>
                  <div className="vline"></div>
                  <div className="hline"></div>
                  {key === length - 1 ? <div className="vline"></div> : ''}
                </Fragment>
              );
            })}
          </div>
          <div className="child-tile-container">
            <div className="child-tile">
              {childData.map((childNode, key) => {
                return (
                  <div className="tile-box" key={`child-${childNode.id}`}>
                    <div className="tile-icon">
                      <OkrIcon />
                      {key === length - 1 ? <OkrIcon icon="help" width={16} /> : ''}
                    </div>
                    <div className="tile-text" onClick={event => dispatch(clickedRowData({ ...childNode, ...{ '__parent': { id: parentData.id, title: parentData.title } } }))}>
                      <OkrTile
                        title={childNode.title}
                        orderKey={key}
                        mode={'child'}
                        rowData={childNode}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
      </div>
    </div >
  );
}


OkrBox.propTypes = {
  childData: PropTypes.array,
  parentData: PropTypes.object
};

OkrBox.defaultProps = {
  childData: [],
  parentData: {}
};
