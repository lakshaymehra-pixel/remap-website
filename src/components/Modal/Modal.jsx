import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalWrapper } from "./style";
import ContextDashboard from '../../Context/ContextDashboard';
import { getStorage } from "../../Utils/common";

const Modal = ({ onClose, msg,state }) => {
  const navigate = useNavigate();
  const { handleEvent } = useContext(ContextDashboard);
  

  // Function to handle the "Process" button click
  const handleProcessClick = () => {
    // handleEvent(getStorage('next_step'));// Redirect to the eligibility URL
    navigate("/my-dashboard/eligibility")
  };

  // Function to handle the "OK" button click
  const handleOkClick = () => {
    // if (eligibilityStatus === 1) {
    //   if (usertype === 'REPEAT' || usertype === 'UNPAID-REPEAT') {
    //     console.log('Navigating to bank-upload...');
    //     navigate('/my-dashboard/bank-upload'); // Redirect to bank upload URL
    //   } else if (usertype === 'NEW') {
    //     handleProcessClick(); // Redirect to eligibility if usertype is NEW
    //   }
    // } else {
      onClose(); // Close modal if not eligible
    // }
  };

  return (
    <ModalWrapper>
      <div className="modal-box">
        <h2>{msg}</h2>
        <div className="modal-buttons">
          {state === 1 ? (
            <button onClick={handleProcessClick}>Process</button>
          ) : (
            <>
              
              
                <button onClick={handleOkClick}>OK</button>
            
            </>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
