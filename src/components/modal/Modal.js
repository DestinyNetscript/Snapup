
import React from 'react'; 

const Modal = ({ isOpen, onClose, children, onConfirm, show  }) => {
  if (!isOpen) return null;

  return (
    <>
    <div className="modal">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}><i className="fa fa-close"></i></button>
        {children}
      </div>
    </div> 
    </> 
  );
};

export default Modal;
 

