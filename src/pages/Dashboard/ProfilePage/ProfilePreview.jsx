import React, { useContext, useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import Button from "../../../components/ui/Button";
import DetailBox from "./DetailBox";
import { ProfilePreviewWrapper } from "./style";
import { useNavigate } from "react-router-dom";
import ContextDashboard from "../../../Context/ContextDashboard";
import { getStorage, setStorage } from "../../../Utils/common";
import { ckeckEligibility, getDashboardData } from "../../../Utils/api";
import Modal from "../../../components/Modal/Modal";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

// Helper function to format date to dd-mm-yyyy
const formatDate = (dateString) => {
  if (!dateString) return "NA"; // Return "NA" if there's no date
  const date = new Date(dateString);
  const day = ("0" + date.getDate()).slice(-2); // Pad single digit days
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Pad single digit months
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function ProfilePreview() {
  const navigate = useNavigate();
  const [modelOpen, setModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responce, setResponce] = useState(false);
  const [status, setStatus] = useState();
  const [progressBar] = useState(getStorage("step_percent"));
  const [dashboard, setDashboard] = useState([]);
  const { logout } = useContext(ContextDashboard);

  useEffect(() => {
    const params = {
      profile_id: getStorage("cust_profile_id") || "",
    };

    getDashboardData(params).then((resp) => {
      if (resp?.data?.Status === 1) {
        setStorage("percent", resp?.data?.Data?.application_filled_percent);
        const dashboardData = resp?.data || {};
        setDashboard(dashboardData);
      }
    });
  }, []);

  const submit = () => {
    const param = {
      "profile_id": getStorage("cust_profile_id") || "",
      "event_name": "register_now",
    };

    setLoading(true);
    ckeckEligibility(param).then((resp) => {
      setLoading(false);
      if (resp?.data?.Status === 1) {
        setModelOpen(true);
        setStorage("next_step", resp?.data?.Data?.next_step);
        setStorage("eligibility", 1);
        setResponce(resp?.data?.Message);
        setStatus(resp?.data?.Status);
      } else if (resp?.data?.Status === 4) {
        logout();
      } else {
        setModelOpen(true);
        setResponce(resp?.data?.Message);
        setStatus(resp?.data?.Status);
      }
    });
  };

  return (
    <ProfilePreviewWrapper>
      <h2 style={{ marginLeft: '20px' }}>Check Eligibility for Further Process</h2><br />
      {progressBar !== 100 && progressBar !== undefined && (
  <ProgressBar value={`${progressBar}%`} />
)}

      <br />
      <ProfileHeader>
        <Button title="Check Eligibility" onClick={submit} loading={loading} />
      </ProfileHeader>
      <div className="detailBox">
        <DetailBox heading="Basic Details">
          <table>
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
                : "NA"}</td>
            </tr>
            <tr>
              <td>DOB</td>
              <td>{formatDate(dashboard?.Data?.profile_details?.dob)}</td>
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
              <td>
                {dashboard?.Data?.profile_details?.personal_email ? dashboard?.Data?.profile_details?.personal_email.toLowerCase() : "NA"}
              </td>
            </tr>
          </table>
        </DetailBox>

        <DetailBox heading="Residence Address">
          <table>
            <tr>
              <td>Address 1</td>
              <td>{dashboard?.Data?.profile_details?.residence_address_1 || "NA"}</td>
            </tr>
            <tr>
              <td>Address 2</td>
              <td>{dashboard?.Data?.profile_details?.residence_address_2 || "NA"}</td>
            </tr>
            <tr>
              <td>Residence Type</td>
              <td>{dashboard?.Data?.profile_details?.residence_type_id
                ? dashboard?.Data?.profile_details?.gender === "1"
                  ? "Owned"
                  : "Rented"
                : "NA"}</td>
            </tr>
            <tr>
              <td>Landmark</td>
              <td>{dashboard?.Data?.profile_details?.residence_landmark || "NA"}</td>
            </tr>
            <tr>
              <td>Pincode</td>
              <td>{dashboard?.Data?.profile_details?.residence_pincode || "NA"}</td>
            </tr>
          </table>
        </DetailBox>

        <DetailBox heading="Income Details">
          <table>
            <tr>
              <td>Employment Type</td>
              <td>{dashboard?.Data?.profile_details?.income_type_id
                ? dashboard?.Data?.profile_details?.income_type_id === "1"
                  ? "Salaried"
                  : "Self-Employed"
                : "NA"
              }</td>
            </tr>
            <tr>
              <td>Salary Date</td>
              <td>{formatDate(dashboard?.Data?.profile_details?.salary_date)}</td>
            </tr>
            <tr>
              <td>Monthy Income</td>
              <td>{dashboard?.Data?.profile_details?.monthly_income || "NA"}</td>
            </tr>
            <tr>
              <td>Mode Income Received</td>
              <td>
                {dashboard?.Data?.profile_details?.income_type_id === null || dashboard?.Data?.profile_details?.marital_status_id === undefined
                  ? "NA"
                  : dashboard?.Data?.profile_details?.income_type_id === "1"
                    ? "Bank"
                    : dashboard?.Data?.profile_details?.income_type_id === "2"
                      ? "Cheque"
                      : "Cash"}
              </td>
            </tr>
          </table>
        </DetailBox>
      </div>
      {modelOpen && <Modal onClose={() => setModelOpen(false)} msg={responce} state={status} onConfirm={() => navigate("/my-dashboard/eligibility")} />}
    </ProfilePreviewWrapper>
  );
}

export default ProfilePreview;
