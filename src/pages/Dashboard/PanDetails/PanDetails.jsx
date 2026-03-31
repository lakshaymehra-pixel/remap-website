import React, { useContext, useEffect, useState, useRef } from 'react';
import { BoxWrapper } from '../../../style';
import arrowIcon from "../../../images/arrow.png";
import PanInput from '../../../components/OtpInput/PanInput';
import { FormWrapper } from '../../../components/loan/style';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';
import { verifyPan } from '../../../Utils/api'; // Import getDashboard
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import { getStorage, goBack, setStorage, isEmpty } from '../../../Utils/common';
import { regexPan } from '../../../Utils/formValidation';
import ContextDashboard from '../../../Context/ContextDashboard';
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

const initialData = {
  monthlyIncome: "",
};

function PanDetails() {
  const [pan, setPan] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [setResponse] = useState({});
  const [setShowSteps] = useState(-1);
  const [setToggle] = useState(true);
  const [progressBar, setProgressBar] = useState(getStorage("step_percent"));
  const { setps } = useContext(ContextDashboard);
  const inputRefs = useRef([]);
  const [formData, setFormData] = useState(initialData);
  const [formDataError, setFormDataError] = useState(initialData);

  const navigate = useNavigate();
  const { message, setMessage, logout, handleEvent } = useContext(ContextDashboard);

  const submit = () => {
    let panData = pan?.join("").toUpperCase();

    // Check if PAN number is valid
    if (!regexPan.test(panData)) {
      setMessage({ type: 'error', msg: "Please enter a valid PAN number" });
      return;
    }

    // Validate monthly income field
    if (!formData.monthlyIncome) {
      setFormDataError({ ...formDataError, monthlyIncome: "Monthly income is required" });
      return;
    }

    const param = {
      event_name: "pancard_verification",
      pancard: panData,
      profile_id: getStorage("cust_profile_id") || "",
      monthly_income: formData.monthlyIncome,
    };

    setLoading(true);
    verifyPan(param).then(resp => {
      setLoading(false);
      if (resp?.data?.Status === 1) {
        setStorage("pancard", panData);
        setStorage("fullName", resp?.data?.Data?.full_name);
        setStorage("step_percent", resp?.data?.Data?.step_percentage);
        setStorage("next_step", resp?.data?.Data?.next_step);
        // setResponse(resp?.data);
        setMessage({ type: 'success', msg: resp?.data?.Message, place: "globle" });
        handleEvent(getStorage('next_step'));
      } else if (resp?.data?.Status === 4) {
        logout();
      } else {
        setPan(["", "", "", "", "", "", "", "", "", ""]);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
        setMessage({ type: 'error', msg: resp?.data?.Message });
      }
    });
  };

  useEffect(() => {
    if (!isEmpty(setps)) {
      checkStep(setps);
    }
  }, [setps]); 

  function checkStep(data) {
    setProgressBar(data?.step_complete_percent);
    const steps = data?.step_stage - 1;
    if (data?.step_complete_percent === 100) {
      setToggle(false);
    }
    setShowSteps(steps);
  }

  // Restrict user input to 10 digits in the "Monthly Income" field
  const handleIncomeChange = (e) => {
    const { value } = e.target;

    // Allow only numbers and restrict input to a maximum of 10 digits
    if (/^\d{0,7}$/.test(value)) {
      setFormData({ ...formData, monthlyIncome: value });
      setFormDataError({ ...formDataError, monthlyIncome: "" });
    }
  };

  return (
    <>
      <ProgressBar value={`${progressBar}%`}>
        <div></div>
        <></>
      </ProgressBar><br />
      <BoxWrapper className="w100">
        <div className="formmainBox flex">
          <div className="left">
            <div className='center gap4 pointer' onClick={() => goBack(navigate, "/my-dashboard/")}>
              <img src={arrowIcon} alt="" /> <span>Back</span>
            </div>
          </div>
          <div className="right">
            <h2>PAN Authentication <span style={{color:'red'}}>*</span></h2>
            <p>Please enter your PAN Card number. Your identity is secure with us.</p>

            <FormWrapper>
              <Alert setMessage={setMessage} message={message} />
              <div className="inputBox panBox d-block">
                <PanInput
                  type="text"
                  setOtp={setPan}
                  otp={pan}
                  isDisable={false}
                  placeholder="*"
                  number={false}
                  inputRefs={inputRefs}
                />
                <Input
                  label="Monthly Income *"
                  name="monthlyIncome"
                  error={formDataError?.monthlyIncome}
                  onChange={handleIncomeChange}  // Use the new handler for restricting input
                  value={formData?.monthlyIncome}
                  required={true}
                  type="number"
                />
              </div>

              <div className="button">
                <Button title="Continue" onClick={submit} loading={loading} />
              </div>
            </FormWrapper>
          </div>
        </div>
      </BoxWrapper>
    </>
  );
}

export default PanDetails;
