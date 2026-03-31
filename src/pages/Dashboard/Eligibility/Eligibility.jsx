
import React, { useContext, useEffect, useState } from "react";

import c1icon from "../../../images/c1.png";
import c2icon from "../../../images/c2.png";
import c4icon from "../../../images/c4.png";
import { useNavigate } from "react-router-dom";
import { getStorage, setStorage } from "../../../Utils/common";
import ContextDashboard from "../../../Context/ContextDashboard";
import { DashboardWrapper } from "../style";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import DashboardCard2 from "../DashboardCard2";
import { getDashboardData } from "../../../Utils/api";


const cardList = [
      {
        heading: "Loan Calculator",
        desc: "Choose the loan amount and tenure.",
        img: c1icon,
        link: "/my-dashboard/calculate-loan",
      },
      {
        heading: "Employment Information",
        desc: "Share about your work status.",
        img: c2icon,
        link: "/my-dashboard/about-your-company",
      },
      {
        heading: "Upload Your Documents",
        desc: "Share your documents to verify your details",
        img: c4icon,
        link: "/my-dashboard/adhar-upload",
      },
      {
        heading: "Banking Details",
        desc: "Share your banking details",
        img: c2icon,
        link: "/my-dashboard/bank-detail",
      },

    ];



function Eligibility() {
  const [cards] = useState(cardList);
  const [showSteps, setShowSteps] = useState(0);
  const [progressBar,setProgressBar] = useState(0)
  const navigate = useNavigate();
  const {currentEvent} = useContext(ContextDashboard);

  const redirect = (data) =>{
    console.log(data);
    navigate(data.link)
  }



useEffect(() => {
  const params = {
    profile_id: getStorage("cust_profile_id") || "",
  };

  getDashboardData(params).then(resp => {

    if (resp?.data?.Status === 1) {

      const dashboardData = resp?.data || {};
      setStorage('dashboardData', dashboardData);
      setStorage('percent',dashboardData?.Data?.application_filled_percent)
      setProgressBar(dashboardData?.Data?.application_filled_percent);
      setStorage('next_step',dashboardData?.Data?.next_event_name);
      setShowSteps(currentEvent(dashboardData?.Data?.next_event_name)-9)
    }
  });
}, []);

useEffect(()=>{
  const steps=currentEvent(getStorage("next_step"));
  setShowSteps(steps);

},[]);

  return (
    <>

    <DashboardWrapper>
      <ProgressBar value={`${progressBar}%`} title="Loan Application"  >
      </ProgressBar>

     {<div className="carde">
        {cards.map((value, index) => {
          return (
           <DashboardCard2
                number={index + 1}  // Adding the card number
                heading={value.heading}
                desc={value.desc}
                img={value.img}
                complate={(index + 1) <= showSteps}
                disable={index !== showSteps}
                key={index}
                onClick={() => redirect(value)}
              />
          );
        })}
       <div className="hideMD"></div>
      </div>

      }

    </DashboardWrapper>
    </>
  );
}

export default Eligibility;