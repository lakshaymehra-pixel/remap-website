import React, { useEffect, useRef } from "react";
import styles from "./MobileInput.module.css";

const MobileInput = ({
  name = "mobile",
  otp = "", // renamed to otp just for compatibility, but it's a string
  setOtp = () => {},
  isDisable = false,
  placeholder = "Enter mobile number",
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

    // Allow only numeric input
    if (!/^[0-9]*$/.test(value)) return;

    // Limit to 10 digits
    if (value.length > 10) return;

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
        placeholder={placeholder}
        disabled={isDisable}
        inputMode="numeric"
        maxLength={10}
        className={`${styles.singleInput} ${error ? styles.error : ""} ${"shadow-none"} ${"border-0 border"} ${"text-start"} ${"form-control"}`}
        />
    </div>
        {error && <p className={styles.errorText}>{error}</p>}
        </>
  );
};

export default MobileInput;
