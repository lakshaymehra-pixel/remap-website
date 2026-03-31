import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './LoanHistory.css'; 
import { ProfilePreviewWrapper } from "../Dashboard/ProfilePage/style";
import ProfileHeader from "../Dashboard/ProfilePage/ProfileHeader";
import { loanDetail } from "../../Utils/api";

function LoanDetail() {
  const location = useLocation();
  const { leadId } = location.state || {};
  const [loan, setLoan] = useState(null);
  const [collection, setCollection] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const params={
      lead_id: leadId, 
    };

    loanDetail(params).then(resp=>{
      if(resp?.data?.Status===1){
        // setStorage("eligibility",resp?.data?.Data?.registration_successful)
        const loanData=resp?.data?.data[0] || {};
        const collectionData=resp?.data?.collection[0] || {};
        setLoan(loanData);
        setCollection(collectionData);
      }
    });
  },[]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <ProfilePreviewWrapper>
      <ProfileHeader />
      <div className="loan-history-card">
        {loan ? (
          <>
            <h2>Loan Details</h2>
            <p><strong>Loan Number:</strong> {loan.loan_no}</p>
            <p><strong>Customer Name:</strong> {loan.first_name}</p>
            <p><strong>Monthly Salary:</strong> {loan.monthly_salary_amount}</p>
            <p><strong>Loan Amount:</strong> {loan.loan_amount}</p>
            <p><strong>Tenure:</strong> {loan.tenure}</p>
            <p><strong>Purpose:</strong> {loan.purpose}</p>
            <p><strong>Mobile:</strong> {loan.mobile}</p>
            <p><strong>Email:</strong> {loan.email}</p>
            <p><strong>Application Status:</strong> {loan.status}</p>
            <p><strong>Pancard:</strong> {loan.pancard}</p>
            <p><strong>Current City:</strong> {loan.m_city_name}</p>
            <p><strong>Current State:</strong> {loan.m_state_name}</p>
            <p><strong>Loan Date:</strong> {loan.lead_final_disbursed_date}</p>
             {/* <br/>
            <h2>Payment History</h2>
            <div className="collection-container">
              {collection.length > 0 ? (
                collection.map((item, index) => (
                  <div key={index} className="collection-card">
                    <p><strong>Received Amount:</strong> {item.received_amount}</p>
                    <p><strong>Date of Received:</strong> {formatDate(item.date_of_recived)}</p>
                    <p><strong>Remarks:</strong> {item.remarks}</p>
                  </div>
                ))
              ) : (
                <p>No Payment History available.</p>
              )}
            </div> */}
          </>
        ) : (
          <p>No loan details available.</p>
        )}
      </div>
    </ProfilePreviewWrapper>
  );
}

export default LoanDetail;
