import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import { ProfilePreviewWrapper } from "./style";
import { getStorage } from "../../../Utils/common";
import { getDashboardData } from "../../../Utils/api";
import LeadBox from './LeadBox';

// Helper function to format date to dd-mm-yyyy
const formatDate = (dateString) => {
  if (!dateString || isNaN(new Date(dateString))) return "NA"; // Check if the date is invalid or empty
  const date = new Date(dateString);
  const day = ("0" + date.getDate()).slice(-2); // Pad single digit days
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Pad single digit months
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function LeadPreview() {
  const[dashboard,setDashboard]=useState([]);


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

  return (
    <ProfilePreviewWrapper>
      <ProfileHeader />
      <div className="detailBox">
        <LeadBox heading="Application Details">
          <table>
            <tbody>
              <tr>
                <td>Your Name</td>
                <td>{dashboard?.Data?.full_name || "NA"}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{dashboard?.Data?.profile_details?.gender
              ? dashboard?.Data?.profile_details?.gender === "1"
              ? "Male"
              : "Female"
              : "NA" }</td>
              </tr>
              <tr>
                <td>DOB</td>
                <td>{formatDate(dashboard?.Data?.profile_details?.dob || "NA")}</td>
              </tr>
              <tr>
                <td>Marital Status</td>
                <td>
                  {dashboard?.Data?.profile_details?.marital_status_id === null || dashboard?.Data?.profile_details?.marital_status_id === undefined
                    ? "NA"
                    : dashboard?.Data?.profile_details?.marital_status_id === "1"
                    ? "Single"
                    : dashboard?.Data?.profile_details?.marital_status_id === "2"
                    ? "Married"
                    : "Divorced"}
                </td>
              </tr>
              <tr>
                <td>Personal Email</td>
                <td>{dashboard?.Data?.profile_details?.personal_email.toLowerCase() || "NA"}</td>
              </tr>
            </tbody>
          </table>
        </LeadBox>

        <LeadBox heading="Credit Manager">
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{dashboard?.Data?.excutive_details?.name || "NA"}</td>
              </tr>
              <tr>
                <td>Number</td>
                <td>
                  <a style={{ color: "#26b9db" }} target="_blank" rel="noreferrer" href={`https://wa.me/${dashboard?.Data?.excutive_details?.mobile}`} onClick={(e) => !dashboard?.Data?.excutive_details?.mobile && e.preventDefault()}>
                    {dashboard?.Data?.excutive_details?.mobile || "NA"}
                  </a>
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <a style={{ color: "#26b9db" }} target="_blank" rel="noreferrer" href={`mailto:${dashboard?.Data?.excutive_details?.email || ""}`} onClick={(e) => !dashboard?.Data?.excutive_details?.email && e.preventDefault()}>
                    {dashboard?.Data?.excutive_details?.email || "NA"}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </LeadBox>

        <LeadBox heading="Application Status">
          <table>
            <tbody>
              <tr>
                <td>Status</td>
                <td>{dashboard?.Data?.lead_details?.status || "NA"}</td>
              </tr>
              <tr>
                <td>Repayment Amount</td>
                <td>{dashboard?.Data?.active_loan_details?.total_due || "NA"}</td>
              </tr>
              <tr>
                <td>Repayment Date</td>
                <td>{formatDate(dashboard?.Data?.active_loan_details?.repayment_date) || "NA"}</td>
              </tr>
            </tbody>
          </table>
        </LeadBox>
      </div>
    </ProfilePreviewWrapper>
  );
}

export default LeadPreview;
