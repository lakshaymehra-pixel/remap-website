import React from 'react'
import { DashboarCarddWrapper } from './style'
import CheckboxIcon from '../../images/CheckboxIcon';

function DashboardCard({heading="",desc="",img=null, complate=false, key,onClick=()=>{},disable}) {
  return (
    <DashboarCarddWrapper key={key} onClick={disable?()=>{}:onClick} className={disable?"":"pointer"}>
        <div className={`icons ${complate?"active":""}`}>
            <img src={img} alt="icon" />
        </div>
        <div className="rightBox">
            <div className="header flex justify-between">
                <h2>{heading}</h2>
                <CheckboxIcon  color={complate?"#5CB85C":"#e1e1e1"} />
            </div>
            <p>{desc}</p>
        </div>

    </DashboarCarddWrapper>
  )
}

export default DashboardCard;