import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    alert !== null && (
      <div className={`alert alert-${alerts.type}`}>
        <i className='fas fa-info-circle' /> {alerts.msg}
      </div>
    )
  );
};

export default Alert;
