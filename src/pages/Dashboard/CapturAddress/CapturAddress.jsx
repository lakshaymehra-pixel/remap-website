import React, { useContext, useEffect, useState } from 'react';
import { BoxWrapper } from '../../../style';
import arrowIcon from "../../../images/arrow.png";
import { FormWrapper } from '../../../components/loan/style';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';
import { getDashboardData, getStateCityPincode, savePerssonalAddress } from '../../../Utils/api';
import { useNavigate } from 'react-router-dom';
import { getStorage, goBack, isEmpty, setStorage } from '../../../Utils/common';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { formValidation } from '../../../Utils/formValidation';
import ContextDashboard from '../../../Context/ContextDashboard';  // Correct default import
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

const initialData = {
    pinCode: "",
    landmark: "",
    current_locality: "",
    address: "",
    residenceType: "",
};

const options = [
    { label: "Owned", value: "1" },
    { label: "Rented", value: "2" }
];

function CapturPersonalInformation() {
    const { message, setMessage, setps, logout, handleEvent } = useContext(ContextDashboard);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData);
    const [formDataError, setFormDataError] = useState(initialData);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [pinCodeList, setPinCodeList] = useState([]);
    const [showSteps, setShowSteps] = useState(-1);
    const [toggle, setToggle] = useState(true);
    const [progressBar, setProgressBar] = useState(getStorage("step_percent"));

    const navigate = useNavigate();

    const submit = () => {
        // Validate form data
        const error = formValidation(formData,["landmark"]);
        setFormDataError({ ...formDataError, ...error });

        const param = {
            profile_id: getStorage("cust_profile_id") || "",
            event_name: "residence_details",
            residence_type_id: formData.residenceType,
            residence_landmark: formData.landmark || "",  // Landmark can be empty now
            residence_address_2: formData.current_locality,
            residence_address_1: formData.address,
            residence_pincode: formData.pinCode
        };

        if (isEmpty(error)) {
            setLoading(true);
            savePerssonalAddress(param).then(resp => {
                setLoading(false);
                if (resp?.data?.Status === 1) {
                    setStorage("next_step", resp?.data?.Data?.next_step);
                    setStorage("step_percent", resp?.data?.Data?.step_percentage);
                    setMessage({ type: 'success', msg: resp?.data?.Message, place: "global" });
                    handleEvent(getStorage('next_step'));
                } else if (resp?.data?.Status === 4) {
                    logout();
                } else {
                    setMessage({ type: 'error', msg: resp?.data?.Message });
                }
            });
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setFormDataError(prev => ({
            ...prev,
            [name]: ""
        }));
    };

    useEffect(() => {
        const params = {
            profile_id: getStorage("cust_profile_id") || "",
        };
        getDashboardData(params).then(resp => {
            if (resp?.data?.Status === 1) {
                const dashboardData = resp?.data || {};
                if (dashboardData) {
                    setFormData(prev => ({
                        ...prev,
                        address: dashboardData?.Data?.profile_details?.residence_address_1 || "",
                        current_locality: dashboardData?.Data?.profile_details?.residence_address_2 || "",
                        landmark: dashboardData?.Data?.profile_details?.residence_landmark || "",
                        pinCode: dashboardData?.Data?.profile_details?.residence_pincode || "",
                        residenceType: dashboardData?.Data?.profile_details?.residence_type_id || "",
                    }));
                }
            }
        });
    }, [logout]);

    useEffect(() => {
        if (!isEmpty(setps)) {
            checkStep(setps);
        }
    }, [setps]);

    const checkStep = (data) => {
        const steps = (data?.step_stage - 1);
        if (data?.step_complete_percent === 100) {
            setToggle(false);
        }
        setShowSteps(steps);
    };

    return (
        <>
            <ProgressBar value={`${progressBar}%`}>
                <div></div>
            </ProgressBar>
            <BoxWrapper className="w100">
                <div className="formmainBox flex">
                    <div className="left">
                        <div className='center gap4 pointer' onClick={() => goBack(navigate, "/my-dashboard/")}>
                            <img src={arrowIcon} alt="" /> <span>Back</span>
                        </div>
                    </div>
                    <div className="right">
                        <h2>Current Residence Address</h2>
                        <p>Ensure to provide correct residence address. No Surprise Visits, We Promise!</p>

                        <FormWrapper>
                            <Alert setMessage={setMessage} message={message} />
                            <div className="inputBox">
                                <Select
                                    label="Residence Type"
                                    name="residenceType"
                                    placeholder="Enter Residence"
                                    error={formDataError?.residenceType}
                                    onChange={onChange}
                                    value={formData?.residenceType}
                                    options={options}
                                    required={true}
                                />
                                <Input
                                    label="Address1"
                                    name="address"
                                    error={formDataError?.address}
                                    onChange={onChange}
                                    value={formData?.address}
                                    required={true}
                                />
                                <Input
                                    label="Address2"
                                    name="current_locality"
                                    error={formDataError?.current_locality}
                                    onChange={onChange}
                                    value={formData?.current_locality}
                                    required={true}
                                />
                                <Input
                                    label="Landmark"
                                    name="landmark"
                                    error={formDataError?.landmark}
                                    onChange={onChange}
                                    value={formData?.landmark}
                                    // Landmark is now optional, no required prop
                                />
                                <Input
                                    label="Pin Code"
                                    name="pinCode"
                                    error={formDataError?.pinCode}
                                    onChange={onChange}
                                    value={formData?.pinCode}
                                    required={true}
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

export default CapturPersonalInformation;
