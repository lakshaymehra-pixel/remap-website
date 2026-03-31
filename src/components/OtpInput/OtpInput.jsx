import React, { useEffect, useRef } from "react";
import styles from "./OtpInput.module.css";

const OtpInput = ({
  name = "otp",
  otp = "",
  setOtp = () => {},
  isDisable = false,
  placeholder = "Enter OTP",
  error = "",
  onChange,
  onKeyDown,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;

    // Allow only numeric and limit to 4 digits
    if (!/^[0-9]*$/.test(value)) return;
    if (value.length > 4) return;

    setOtp(value);
    if (onChange) onChange(e);
  };

  return (
    <>
    <div className={["input-group"].join(" ")}>
      <span class="input-group-text bg-dark" id="basic-addon1" style={{borderRadius:"30px 0px 0px 30px",backgroundImage:"linear-gradient(to right, #26B9DB, #5D99E7)",animationDuration:"2s"}} ><i class="fa-solid text-white fa-mobile-screen-button fa-beat"></i></span>
      <input
        ref={inputRef}
        type="text"
        name={name}
        value={otp}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder="Enter OTP"
        disabled={isDisable}
        inputMode="numeric"
        maxLength={4}
        className={`${styles.singleInput} ${error ? styles.error : ""} ${"shadow-none"} ${"border-0 border"} ${"text-start"} ${"form-control"}`}
      />
    </div>
      {error && <p className={styles.errorText}>{error}</p>}
      </>
  );
};

export default OtpInput;
