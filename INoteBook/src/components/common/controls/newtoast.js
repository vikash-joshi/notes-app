import React, { useState, useEffect } from 'react';
import './newtoast.css'

const ToastComponent = ({ show, onClose,type, message, duration }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (show) {
      setProgress(100); // Start from 100%
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            onClose();
            return 0;
          }
          return prev - 1; // Decrease the progress bar
        });
      }, duration / 100); // Adjust interval for the duration

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [show, duration, onClose]);

  return (
    <div className={`toast align-items-center ${type} border-0 ${show ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="d-flex">
        <div className="toast-body">
          <div className="align-items-center justify justify-content-start d-flex">
            <div className="me-3">
            <span class="material-symbols-outlined" style={{fontSize:'31px'}}>
            {type?.toString().includes('danger') ? 'error':'check_circle'}
</span>

            </div>
            <div>

              <strong className="me-auto">{type?.toString().includes('danger') ? 'Error':'Success'}</strong>
              <p>{message}</p>
            </div>
          </div>
        
     
        </div>
        <button type="button" className="btn-close mt-2" aria-label="Close" onClick={onClose}></button>
      </div>
      <div className="progress mt-1">
            <div className={`progress-bar bg-${type?.replace('text-','')}`} role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="1" aria-valuemax="100"></div>
          </div>
    </div>
  );
};

export default ToastComponent;
