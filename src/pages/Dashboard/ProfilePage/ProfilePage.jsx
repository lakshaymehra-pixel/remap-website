import React, { useContext, useEffect, useState } from "react";
import { DashboarCarddWrapper, DashboardWrapper } from "../style";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import DashboardCard from "../DashboardCard";
import c1icon from "../../../images/c1.png";
import c2icon from "../../../images/c2.png";
import c3icon from "../../../images/c3.png";
import c4icon from "../../../images/c4.png";
import c5icon from "../../../images/c5.png";

import { useNavigate } from "react-router-dom";
import { getStorage, isEmpty } from "../../../Utils/common";
import ContextDashboard from "../../../Context/ContextDashboard";


const cardList = [
  {
    heading: "PAN Authentication",
    desc: "Please enter your PAN Card number. Your identity is secure with us.",
    img: c1icon,
    complate: true,
    link:"/my-dashboard/pan-details"
  },
 

  {
    heading: "Current Residence Address",
    desc: "Ensure to provide correct residence address. No Surprise Visits, We Promise.",
    img: c2icon,
    complate: false,
      link:"/my-dashboard/captur-address"
  },
  {
    heading: "Personal Information",
    desc: "Share with us a bit about yourself.",
    img: c3icon,
    complate: false,
        link:"/my-dashboard/captur-personal-information"
  },
  {
    heading: "Income Details",
    desc: "Share your Income Details.",
    img: c4icon,
    complate: false,
       link:"/my-dashboard/captur-income-details"
  },
  {
    heading: "Selfie Upload",
    desc: "Share you selfie and complete the registration.",
    img: c5icon,
    complate: false,
      link:"/my-dashboard/upload-picture"
  },
];
function ProfilePage() {
  const [cards, setCards] = useState(cardList);
  const [showSteps, setShowSteps] = useState(-1);
  const [progressBar, setProgressBar] = useState("10");

  const navigate = useNavigate();
  const {message,setMessage,setProfileData,profileData,setps,} = useContext(ContextDashboard);

  const redirect = (data) => {
    console.log(data);
    navigate(data);
  };

 
  useEffect(()=>{
    console.log("setps",setps)
    if(!isEmpty(setps)){
      checkStep(setps);
    }
   
  },[setps]);

function checkStep(data){
 
      setProgressBar(data?.step_complete_percent);
      const steps = (data?.step_stage - 1) ;
     
      setShowSteps(steps);
     
  
  }


  return (
    <DashboardWrapper>
      <ProgressBar value={`${progressBar}%`}>
        <div></div>
      </ProgressBar>

      <div className="carde">
        {cards.map((value, index) => {
          return (
            <DashboardCard
              heading={value.heading}
              desc={value.desc}
              img={value.img}
              complate={(index+1 ) <= showSteps}
              disable={true}
              key={index}
              // onClick={() => redirect(value.link)}
            />
          );
        })}
        <DashboarCarddWrapper
          className="center pointer"
          style={{ background: "#26B9DB" }}
          onClick={() => redirect("/my-dashboard/profile-preview")}
        >
          <div className="rightBox">
            <div className="header">
              <h2 style={{ textAlign: "center", color: "#fff" }}>
                {" "}
                Profile Preview
              </h2>
            </div>
          </div>
        </DashboarCarddWrapper>
        <DashboarCarddWrapper style={{ opacity: "0" }}></DashboarCarddWrapper>
        <DashboarCarddWrapper style={{ opacity: "0" }}></DashboarCarddWrapper>
      </div>
    </DashboardWrapper>
  );
}

export default ProfilePage;
