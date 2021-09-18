import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.css';
import PropTypes from 'prop-types';
import { clickedTitle, resetRowData } from '../../features/OkrDisplay/displaySlice';
import { AllyTypography } from '../AllyTypography';


/**
 * @name OkrDialog
 * @description OKR display dialog
 * @param {*} props 
 * @returns Dialog Component
 */

export function OkrDialog(props) {
  const titleData = useSelector(clickedTitle);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(titleData).length > 0) {
      document.getElementById("ally-modal-click-1").click();
    }
  }, [titleData]);

  return (
    <div>

      <input className="modal-state" id="ally-modal-click-1" type="checkbox" />
      <div className="modal">
        <label className="modal-bg" htmlFor="ally-modal-click-1" onClick={event => dispatch(resetRowData())}></label>
        <div className="modal-inner">
          <label className="modal-close" htmlFor="ally-modal-click-1" onClick={event => dispatch(resetRowData())}></label>
          {titleData && titleData.__parent && titleData.__parent.title &&
            <Fragment>
              <div className={"modal-primary-obejective"}>
                <AllyTypography variant={"title"} component="span">Parent Objective: {titleData.__parent.title}(ID# {titleData.__parent.id})</AllyTypography>
                <br />
              </div>
              <br />
            </Fragment>
          }
          <br />
          <div className="modal-primary-obejective">Current Objective # </div>
          <br />
          <div>
            <AllyTypography variant={"title"} component="span">ID# {titleData.id}</AllyTypography>
          </div>
          <br />
          <div>
            <AllyTypography variant={"title"} component="span">Category: {titleData.id}</AllyTypography>
          </div>
          <br />
          <div>
            <AllyTypography variant={"title"} component="span">Title: {titleData.title}</AllyTypography>
          </div>
          <br />
          <div>
            <AllyTypography variant={"title"} component="span">Metric Name: {titleData.metric_name ? titleData.metric_name : '---'}</AllyTypography>
          </div>
          <br />
          <div>
            <AllyTypography variant={"title"} component="span">Metric Start: {titleData.metric_start ? titleData.metric_start : '---'}</AllyTypography>
          </div>
          <br />
          <div>
            <AllyTypography variant={"title"} component="span">Metric Target: {titleData.metric_target ? titleData.metric_target : '---'}</AllyTypography>
          </div>
          <br />
          <div>
            <AllyTypography variant={"title"} component="span">Archived: {titleData.archived ? titleData.archived : '---'}</AllyTypography>
          </div>

        </div>
      </div>
    </div>
  );
}

OkrDialog.propTypes = {
  data: PropTypes.object
};

OkrDialog.defaultProps = {
  data: {}
};
