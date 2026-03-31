

import React from 'react'
import { BoxWrapper } from '../../../style'
import { goBack } from '../../../Utils/common';
import arrowIcon from "../../../images/arrow.png";
import { useNavigate } from 'react-router-dom';
import LoanCalculator from '../../../components/LoanCalculator/LoanCalculator';

function CalculateLoan() {
    const navigate = useNavigate();

  return (
  
    <BoxWrapper  className="w100 gray" >
        <div className="formmainBox flex">
          <div className="left">
            <div className='center gap4 pointer' onClick={()=>goBack(navigate,"/my-dashboard/eligibility")}>
                <img src={arrowIcon} alt="" /> <span>Back</span>
            </div>
          </div>
          <div className="right">
          <h2>CALCULATING LOANS</h2>

            <LoanCalculator />
          </div>
        </div>

       </BoxWrapper>
  )
}

export default CalculateLoan;