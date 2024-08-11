// ModalComponent.js
import React from 'react';

const ModalComponent = ({ isOpen, onClose , Modal }) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade show bd-example-modal-lg" tabIndex="-1" role="dialog" style={{ display: 'block',backgroundColor:'#00000080' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header" style={{height:'0px'}}>
            <h5 className="modal-title" id="exampleModalLabel">{Modal?.Title}</h5>
            <button type="button" className="btn-close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{maxHeight:'350px',overflowX:'auto'}}>
            <p>{Modal?.Content}</p>
          </div>
          
          { Modal.Action ? <><div className="modal-footer" >
           <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button><button type="button" className="btn btn-primary">Save changes</button></div></>  :""}
          
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
