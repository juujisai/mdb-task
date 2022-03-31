import React from 'react';

const Alert = ({ txt, type = 'success' }) => {
  return (
    <div className={`alert alert-${type}`}>
      {txt}
    </div>
  );
}

export default Alert;