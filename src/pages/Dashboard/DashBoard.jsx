import React, { useContext, useEffect, useState } from "react";
import { DashboardWrapper } from "./style";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import c1icon from "../../images/c1.png";
import c2icon from "../../images/c2.png";
import c3icon from "../../images/c3.png";
import c4icon from "../../images/c4.png";
import c5icon from "../../images/c5.png";
import banner from "../../images/bannerimg2.webp";
import play from "../../images/play-circle.png";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { getStorage, setStorage } from "../../Utils/common";
import ContextDashboard from "../../Context/ContextDashboard";
import DashboardCard2 from "./DashboardCard2";
import { getDashboardData, ckeckEligibility } from "../../Utils/api";
import Modal from "../../components/Modal/Modal";
import { initPixel,trackLead } from "../../Utils/metaPixel";

const cardList = [
  {
    heading: "PAN Authentication",
    desc: "Please enter your PAN Card number. Your identity is secure with us.",
    img: c1icon,
    complate: true,
    link: "/my-dashboard/pan-details"
  },
  {
    heading: "Personal Information",
    desc: "Share with us a bit about yourself.",
    img: c3icon,
    complate: false,
    link: "/my-dashboard/captur-personal-information"
  },
  {
    heading: "Current Residence Address",
    desc: "Ensure to provide correct residence address. No Surprise Visits, We Promise.",
    img: c2icon,
    complate: false,
    link: "/my-dashboard/captur-address"
  },
  {
    heading: "Income Details",
    desc: "Share your Income Details.",
    img: c4icon,
    complate: false,
    link: "/my-dashboard/captur-income-details"
  },
  {
    heading: "Selfie Upload",
    desc: "Share your selfie and complete the registration.",
    img: c5icon,
    complate: false,
    link: "/my-dashboard/upload-picture"
  },
];

function DashBoard() {
  const [cards, setCards] = useState(cardList);
  const [stepComplate, setStepComplate] = useState(false);
  const [showSteps, setShowSteps] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [progressBar, setProgressBar] = useState(0);
  const [modelOpen, setModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responce, setResponce] = useState(false);
  const [status, setStatus] = useState();
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false); // New state to track registration success
  const { message, setMessage, setProfileData, profileData, eligibilityStatus, getProfileDaital, logout, currentEvent } = useContext(ContextDashboard);

  const navigate = useNavigate();

  const redirect = (data) => {
    navigate(data.link);
  };

  const showSteps_ = () => {
    if (eligibilityStatus === 'ELIGIBLE') {
      navigate('/my-dashboard/eligibility');
    } else {
      setToggle(!toggle);
    }
  };

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

  useEffect(() => {
    // leadPixel
    initPixel();
    trackLead();
    
    const params = {
      profile_id: getStorage("cust_profile_id") || "",
    };

    getDashboardData(params).then(resp => {
      if (resp?.data?.Status === 1) {
        const dashboardData = resp?.data || {};
        setStorage('dashboardData', dashboardData);
        setStorage('step_percent', dashboardData?.Data?.profile_filled_percent);
        setProgressBar(dashboardData?.Data?.profile_filled_percent);
        
        // Check if registration is successful
        if (dashboardData?.Data?.registration_successful === 1) {
          setRegistrationSuccessful(true); // Set to true if registration is successful
        } else {
          setRegistrationSuccessful(false); // Set to false if registration is not successful
        }
      }
    });
  }, []);

  useEffect(() => {
    const steps = currentEvent(getStorage("next_step"));
    setShowSteps(steps);
  }, []);

  return (
    <DashboardWrapper>
      <ProgressBar value={`${progressBar}%`}>
        {registrationSuccessful && ( // Only show button if registration is successful
          <div>
            <Button title="Check Eligibility" onClick={submit} loading={loading} />
          </div>
        )}
      </ProgressBar>

      {toggle ? (
        <div className="carde">
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
      ) : (
        <>
          <div className="banner flex">
            <div className="card card1">
              <h2>Your Gateway to Quick Easy & Hassle Free Finances.</h2>
            </div>
            <div className="card card2">
              <img src={banner} alt="" />
              <div className="center play">
                <img src={play} alt="play" />
                <h2>JOURNEY STEPS</h2>
              </div>
            </div>
            <div className="card card3">
              <h3>Dive into Financial Freedom!</h3>
              <p>Apply now for our instant personal loan - unlock a world of collateral-free ease, no credit score hassles, a seamless 100% online application process, and the simplicity of minimal documentation. Your journey to hassle-free finances starts here!.</p>
              <Button title="Support" />
            </div>
          </div>
        </>
      )}
      {modelOpen && <Modal onClose={() => setModelOpen(false)} msg={responce} state={status} onConfirm={() => navigate("/my-dashboard/eligibility")} />}
    </DashboardWrapper>
  );
}

export default DashBoard;
