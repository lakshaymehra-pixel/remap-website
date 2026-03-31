import React, { useState, useEffect } from 'react';
import styles from './OtpInput.module.css';
import { isEmpty } from '../../Utils/common';

const PanInput = ({
  type,
  otp = ['', '', '', ''],
  setOtp = () => {},
  isDisable = false,
  placeholder = "",
  number = true,
  caseText = "upper",
  onKeyDown,
  inputRefs
}) => {
  const [focus, setFocus] = useState(null);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [inputRefs]);

  const handleOtpChange = (e, index) => {
    let value = e.target.value;

    if (caseText === "upper") {
      value = value.toUpperCase();
    }

    const isFirstFiveInputs = index < 5;
    const isLastFourInputs = index >= 5 && index < 9;
    const pattern = isFirstFiveInputs
      ? /^[A-Z]*$/
      : isLastFourInputs
      ? /^[0-9]*$/
      : /^[A-Z]*$/;

    if (pattern.test(value) && value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      focusNextInput(value, index);
    }
  };

  const focusNextInput = (value, index) => {
    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && isEmpty(otp[index])) {
      if (index > 0) {
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = "";
        setOtp(updatedOtp);
        inputRefs.current[index - 1].focus();
      }
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const onFocusInput = (e) => {
    e.target?.children[0]?.focus();
  };

  return (
    <div className={["flex",styles.otpInput].join(" ")} style={{marginLeft:"30px"}}>
      {otp.map((digit, index) => (
        <div className={`${styles.box} ${focus === index ? styles.focus : ''}`} key={index} onClick={onFocusInput}>
          <input
            type={type}
            placeholder={placeholder}
            disabled={isDisable}
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            maxLength="1"
            ref={(input) => (inputRefs.current[index] = input)}
            onFocus={() => setFocus(index)}
            onBlur={() => setFocus(null)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        </div>
      ))}
    </div>
  );
};

export default PanInput;
