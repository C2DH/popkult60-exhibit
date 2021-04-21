import React from 'react'

const ModuleNotImplemented = ({ mod }) => {
  return (
    <div className="alert alert-info">
      This module has not yet implemented:
      <pre>{JSON.stringify(mod)}</pre>
    </div>
  );
};
export default ModuleNotImplemented
