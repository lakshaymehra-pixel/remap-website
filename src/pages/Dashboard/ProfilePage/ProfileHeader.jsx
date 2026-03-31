import React, { useContext, useEffect, useState } from 'react';
import { ProfileHeaderWrapper } from "./style";
import ContextDashboard from '../../../Context/ContextDashboard';
import { getDashboardData } from '../../../Utils/api';
import { getStorage } from '../../../Utils/common';

function ProfileHeader({ children }) {
  useContext(ContextDashboard);
  const [dashboard, setDashboard] = useState([]);


  // Fetch dashboard data on component mount
  useEffect(() => {
    const params = {
      profile_id: getStorage("cust_profile_id") || "",
    };

    getDashboardData(params).then(resp => {
      if (resp?.data?.Status === 1) {
        const dashboardData = resp?.data || {};
        setDashboard(dashboardData);
      }
    });
  }, []);


  // Check if active_loan_details has valid data
  const hasActiveLoanDetails = dashboard?.Data?.active_loan_details &&
    (dashboard?.Data?.active_loan_details?.total_due > 0 ||
    Object.keys(dashboard?.Data?.active_loan_details).length > 0);

  return (
    <ProfileHeaderWrapper>
      <div className="imgBox">
        <img src={dashboard?.Data?.profile_pic} alt="" />
        {/* <div className="editIcon center" onClick={redirect}>
          <img src={editIcon} alt="" />
        </div> */}
      </div>
      <div className="main">
        <div className="textBox">
          {/* Conditionally render Outstanding Amount and Pay Now button */}
          {hasActiveLoanDetails ? (
            <div className="outstandingAmount">
              <h2>
                Outstanding Amount: {dashboard?.Data?.active_loan_details?.total_due || ""}
              </h2>
              {/* <button style={{ float: "right", marginTop: "10px" }} onClick={handleClick}>Pay Now</button> */}
            </div>
          ) : null}

          <div className="flex">
            <span className="title">Name:</span>
            <span className="value">{dashboard?.Data?.full_name || "NA"}</span>
          </div>
          <div className="flex">
            <span className="title">PAN Card:</span>
            <span className="value">{dashboard?.Data?.profile_details?.pancard || "NA"}</span>
          </div>
          <div className="flex">
            <span className="title">Mobile:</span>
            <span className="value">
              {dashboard?.Data?.profile_details?.mobile || "NA"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex bottom">
        <p>
          Don't let uncertainty hold you back. It's time to explore the
          possibilities.
        </p>
        {children}
      </div>
    </ProfileHeaderWrapper>
  );
}

export default ProfileHeader;
