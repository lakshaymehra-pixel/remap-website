import React, { useEffect, useState, useRef } from "react";
import styles from "../loginwrapper.module.css";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import bannerimage from "../../../images/loginbannerimage.png";
import OtpInput from "../../OtpInput/OtpInput";
import imgLogin from "../../../images/loginImg2.webp";
import { getStorage, isEmpty, isNumber, setStorage } from "../../../Utils/common";
import { useNavigate } from "react-router-dom";
import { sendotpForLogin, verifyotpForLogin } from "../../../Utils/api";
import Alert from "../../ui/Alert";
import MobileInput from "../../OtpInput/MobileInput";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import { trackGoogleConversion } from "../../../Utils/googleAds";

function Login() {
  const [otp, setOtp] = useState([""]);
  const [screen, setScreen] = useState("getOtp");
  const [seconds, setSeconds] = useState(0);
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [loading, setLoading] = useState(false);
  const [accept, setAccept] = useState(false);
  const [acceptError, setAcceptError] = useState("");
  const [message, setMessage] = useState({});
  const [response, setResponse] = useState({});
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  // Extract UTM parameters from URL
  const getUtmParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
    };
  };

  useEffect(() => {
    if (screen === "getOtp") return;
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [screen, seconds]);

  const sendOtp = () => {
    if (mobile.length < 10) {
      setMobileError("The Mobile field must be at least 10 characters in length.");
      return;
    }
    if (!accept) {
      setAcceptError("Please check the checkbox to accept our terms and conditions");
      return;
    } else {
      setAcceptError("");
    }

    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = getUtmParams();

    const param = {
      mobile,
      event_name: "login",
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
    };

    setLoading(true);
    sendotpForLogin(param).then((resp) => {
      setLoading(false);
      if (resp?.data?.Status === 1) {
        setResponse(resp?.data);
        setStorage("mobile", mobile);
        setStorage("cust_profile_id", resp?.data?.Data?.cust_profile_id);
        setScreen("otpScreen");
        setSeconds(30);
        setMessage({ type: "success", msg: resp?.data?.Message, place: "globle" });
      } else {
        setMobile("");
        setMessage({ type: "error", msg: resp?.data?.Message || "An error occurred" });
      }
    });
  };

  const resendOtp = () => {
    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = getUtmParams();

    const param = {
      profile_id: getStorage("cust_profile_id"),
      event_name: "resend_otp",
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
    };

    setLoading(true);
    sendotpForLogin(param).then((resp) => {
      setLoading(false);
      if (resp?.data?.Status === 1) {
        setResponse(resp?.data);
        setSeconds(30);
        setMessage({ type: "success", msg: resp?.data?.Message, place: "globle" });
      } else {
        setMobile("");
        setMessage({ type: "error", msg: resp?.data?.Message || "An error occurred" });
      }
    });
  };

  const verifyOTP = async () => {
    const otpNumber = otp;
    if (otpNumber.length !== 4) {
      setMessage({ type: "error", msg: "Please enter 4 digits OTP" });
      return;
    }

    const param = {
      event_name: "otp_verify",
      profile_id: getStorage("cust_profile_id"),
      otp: otpNumber,
    };

    setLoading(true);
    try {
      const resp = await verifyotpForLogin(param);
      setLoading(false);

      if (resp?.data?.Status === 1) {
        trackGoogleConversion();
        setResponse(resp?.data);
        setStorage("next_step", resp?.data?.Data?.next_step);
        setStorage("token", resp?.data?.Data?.app_login_token);
        setMessage({ type: "success", msg: resp?.data?.Message, place: "globle" });

        if (resp?.data?.Data?.eligibility_status === 1) {
          setStorage("eligibility", 1);
        } else {
          setStorage("eligibility", 0);
        }

        setTimeout(() => {
    if (getStorage("eligibility") === 1) {
      navigate("/my-dashboard/eligibility");
    } else {
      navigate("/my-dashboard");
    }
  }, 300);
      } else {
        setOtp(["", "", "", ""]);
        setMessage({ type: "error", msg: resp?.data?.Message || "An error occurred" });
      }
    } catch (err) {
      setLoading(false);
      setMessage({ type: "error", msg: "Error verifying OTP" });
      console.error("OTP Verification Error:", err);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (screen === "getOtp") sendOtp();
      else verifyOTP();
    }
  };

  useEffect(() => {
    if (isEmpty(message)) return;
    const timer = setTimeout(() => {
      setMessage({});
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      <Helmet>
        <title>Apply for Instant Salary Loan Online | Salary Top Up</title>
        <meta
          property="og:title"
          content="Apply for Instant Salary Loan Online | Salary Top Up"
        />
        <meta
          name="description"
          content="Apply for a salary loan with just your mobile number. Quick, paperless process with instant OTP verification. Fast approvals & secure digital experience."
        />
        <meta
          property="og:description"
          content="Apply for a salary loan with just your mobile number. Quick, paperless process with instant OTP verification. Fast approvals & secure digital experience."
        />
        <link rel="canonical" href="https://salarytopup.com/apply-now"></link>
      </Helmet>

      <div
        className={["flex", styles.loginWrapper, "justify-center"].join(" ")}
        style={{
          backgroundImage: `url(${bannerimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={styles.left}>
          <img src={imgLogin} alt="" />
          <div className={styles.textBox}>
            <h2>
              Need an <br /> instant loan
            </h2>
            <div>Up to ₹100,000</div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.form}>
            <Alert setMessage={setMessage} message={message} />
            <h1 className="h4 fw-bolder">Apply for a Personal Loan</h1>

            {screen === "getOtp" ? (
              <>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    marginBottom: "30px",
                  }}
                >
                  Enter your 10 digit mobile number to get started
                </p>

                <div
                  className={[
                    styles.otpBox,

                  ].join(" ")}
                >
                  <MobileInput
                    name="mobile"
                    otp={mobile}
                    setOtp={setMobile}
                    isDisable={false}
                    error={mobileError}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div
                  className="flex confirm"
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    textAlign: "justify"
                  }}
                >
                  <input
                    style={{
                      height: "15px",
                      width: "35px",
                      marginRight: "10px",
                    }}
                    name="radio"
                    type="radio"
                    checked={accept}
                    onChange={() => {
                      setAccept(!accept);
                      setAcceptError("");
                    }}
                  />
                  <p style={{ fontSize: "14px", lineHeight: "14px" }}>
                    I give my consent for SalaryTopup to reach out to me through
                    phone calls..
                    {showMore ? (
                      <span>
                        , text messages, WhatsApp, email, or the SalaryTopup
                        mobile application, using the contact details I have
                        shared. I confirm that I have carefully read and agree
                        to the{" "}
                        <a to="/termsandconditions">Terms & Conditions</a> and{" "}
                        <a to="/privacypolicy">Privacy Policy</a> of SalaryTopup.
                      </span>
                    ) : (
                      <span>
                        <button
                          onClick={() => setShowMore(true)}
                          style={{
                            cursor: "pointer",
                            border: "none",
                            background: "none",
                            color: "#26b9db",
                            textDecoration: "none",
                          }}
                        >
                          {" "}
                          read more
                        </button>
                      </span>
                    )}
                  </p>
                </div>
                {acceptError && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {acceptError}
                  </p>
                )}

                <div className="button">
                  <Button title="Get OTP" onClick={sendOtp} loading={loading} />
                </div>
              </>
            ) : (
              <>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    marginBottom: "18px",
                  }}
                >
                  Mobile number : ******{mobile.slice(-4)}
                </p>
                <p>Please enter the OTP to unlock your next step.</p>

                <div className={styles.otpBox}>
                  <OtpInput
                    type="text"
                    setOtp={setOtp}
                    otp={otp}
                    isDisable={false}
                    placeholder="Enter Your OTP"
                    onKeyDown={handleKeyDown}
                    inputRefs={inputRefs}
                  />
                </div>

                <div className="button">
                  <Button
                    title="Verify OTP"
                    onClick={verifyOTP}
                    loading={loading}
                  />
                </div>

                <div className={styles.resend}>
                  {seconds > 0 ? (
                    <p className="none">
                      Didn't receive the OTP?{" "}
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{
                          marginRight: "5px",
                          marginLeft: "5px",
                          color: "red",
                        }}
                      />{" "}
                      <span style={{ color: "red", fontWeight: 600 }}>
                        00:{seconds}s
                      </span>
                    </p>
                  ) : (
                    <button
                      onClick={!loading ? resendOtp : () => {}}
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid #26b9db",
                        color: "#26b9db",
                        padding: "10px 9px",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontFamily: "Roboto, sans-serif",
                        transition:
                          "background-color 0.3s, color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#26b9db";
                        e.target.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#26b9db";
                      }}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
