import React from 'react'
import { DashboarCarddWrapper } from './style'
import CheckboxIcon2 from '../../images/CheckboxIcon2';

function DashboardCard2({number="",heading="",desc="",img=null, complate=false, key,onClick=()=>{},disable}) {
   const cardClass = complate ? 'completed' : disable ? 'disabled' : 'current';
  return (
    <DashboarCarddWrapper key={key} onClick={disable ? () => {} : onClick} className={cardClass}>
        <div className={`icons ${complate?"active":""}`}>
            <img src={img} alt="icon" />
        </div>
        <div className="rightBox">
            <div className="header flex justify-between">
                <h2>{heading}</h2>
                <CheckboxIcon2  color={complate?"#5CB85C":"#e1e1e1"} number={number} />
            </div>
            <p>{desc}</p>
        </div>

    </DashboarCarddWrapper>
  )
}

export default DashboardCard2;