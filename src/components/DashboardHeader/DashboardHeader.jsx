import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { HeaderWrapper } from './style';
import logo from '../../images/logo.webp';
import logoSm from '../../images/logo.webp';
import bar from '../../images/bar.webp';
import userIcon from '../../images/userIcon.webp';
import ContextDashboard from '../../Context/ContextDashboard';
import { getDashboardData } from '../../Utils/api';
import { getStorage, isEmpty } from '../../Utils/common';
import Footer from "../../images/footer_bg_2.jpg";

function DashboardHeader({ toggle, setToggle }) {
  const [dashboard, setDashboard] = useState([]);
  const { message, setMessage, setProfileData, profileData, setSetps, getProfileDaital } = useContext(ContextDashboard);
  const navigate = useNavigate(); 

  useEffect(() => {
    const params = {
      profile_id: getStorage("cust_profile_id") || "",
    };

    getDashboardData(params).then(resp => {
      if (resp?.data?.Status === 1) {
        // Set dashboard data
        const dashboardData = resp?.data || {};
        setDashboard(dashboardData);
      }
    });
  }, []);

  // Handle right flex box click
  const handleRightFlexClick = () => {
    const eligibility = getStorage('eligibility');
    if (eligibility === 1) {
      navigate('/my-dashboard/lead-preview'); 
    } else {
      navigate('/my-dashboard/profile-preview'); 
    }
  };

  return (
    <HeaderWrapper
      style={{
        backgroundImage: `url(${Footer})`,
        backgroundSize: 'cover',
        backgroundColor: "#1e50a2",
      }}
      className='flex justify-between'
    >
      <div className="left flex">
        <div className="badgeIcon pointer" onClick={() => setToggle(!toggle)}>
          <img style={{ width: "32px" }} src={bar} alt="logo" />
        </div>
        {/* <div className="logo">
          <Link to="/">
            <img className='xl' src={logo} alt="logo" />
          </Link>
          <img className='sm' src={logoSm} alt="logo" />
        </div> */}
      </div>

      <div className="right flex" onClick={handleRightFlexClick}>
        <div className="icon">
          <img src={dashboard?.Data?.profile_pic || getStorage("selfie")} alt="" />
        </div>
        <div className="name"> Hi, {getStorage("fullName") || dashboard?.Data?.profile_details?.first_name}</div>
      </div>
    </HeaderWrapper>
  );
}

export default DashboardHeader;
