

import React from 'react'
import { DetailBoxWrapper } from './style';
import editIcon from '../../../images/edit.svg';

function LeadBox({children,heading="", onClock=()=>{}}) {
  return (
    <DetailBoxWrapper>
        <div className="header">
            <h2>{heading}</h2>
        </div>
        <div className="main">
            {children}
          
        </div>

    </DetailBoxWrapper>
  )
}

export default LeadBox;