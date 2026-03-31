

import React from 'react'
import { DetailBoxWrapper } from './style';

function DetailBox({children,heading="", onClock=()=>{}}) {
  return (
    <DetailBoxWrapper>
        <div className="header">
            <h2>{heading}</h2>
            {/* <div className="icons center" onClick={onClock}>
                <img src={editIcon} alt="" />
                <span>Edit</span>
            </div> */}
        </div>
        <div className="main">
            {children}

        </div>

    </DetailBoxWrapper>
  )
}

export default DetailBox;