
 
import React from 'react'; 

const Modaluser = ({ show, onClose, onConfirm, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
      	<div className="modalContent">
	        <button className="closeButton" onClick={onClose}><i className="fa fa-close"></i></button>
	        {children}
	        <div className="modal-actions mFunction">
	          <button onClick={onClose} className="modal-button">Cancel</button>
	          <button onClick={onConfirm} className="modal-button">Delete</button>
	        </div>
        </div>
      </div>
    </div>
  );
};

export default Modaluser;