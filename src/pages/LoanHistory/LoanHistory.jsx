import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoanHistory.css'; 
import { ProfilePreviewWrapper } from "../Dashboard/ProfilePage/style";
import ProfileHeader from "../Dashboard/ProfilePage/ProfileHeader";
import { allLeads, getDashboardData } from "../../Utils/api";
import { getStorage, setStorage } from "../../Utils/common";

function LoanHistory() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const params = {
      profile_id: getStorage("cust_profile_id") || "", 
    };

    getDashboardData(params).then(resp => {
      if (resp?.data?.Status === 1) {
        const dashboardData = resp?.data || {};
        setStorage("pancard", dashboardData?.Data?.profile_details?.pancard);
        const params1 = {
          pancard: getStorage("pancard")
        };
        allLeads(params1).then((resp) => {
          if (resp?.data?.Status === 1) {
            const LeadData = resp?.data?.Data?.lead_list;
            setLeads(LeadData);
          }
        }).catch(error => {
          console.error("Error fetching leads:", error);
        });
      }
    });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleCardClick = (leadId) => {
    // Use navigate to redirect and pass state
    navigate("/my-dashboard/details", { state: { leadId } });
  };

  return (
    <ProfilePreviewWrapper>
      <ProfileHeader />
      <div className="loan-history">
        {leads.length > 0 ? (
          leads.map(lead => (
            <div
              key={lead.lead_id}
              className="lead-card"
              onClick={() => handleCardClick(lead.lead_id)} // Use onClick to navigate
            >
              <h3>Lead id: {lead.lead_id}</h3>
              <p>Loan Amount: {lead.loan_amount}</p>
              <p>Status: {lead.status}</p>
              <p>Applied Date: {formatDate(lead.lead_entry_date)}</p>
            </div>
          ))
        ) : (
          <p>No loan history found.</p>
        )}
      </div>
    </ProfilePreviewWrapper>
  );
}

export default LoanHistory;
