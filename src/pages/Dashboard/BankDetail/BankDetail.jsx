import React, { useContext, useState } from 'react';
import { BoxWrapper } from '../../../style';
import { FormWrapper } from '../../../components/loan/style';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';
import {  aboutCompany } from '../../../Utils/api';
import { getStorage, isEmpty, setStorage } from '../../../Utils/common';
import Input from '../../../components/ui/Input';
import { formValidation } from '../../../Utils/formValidation';
import ContextDashboard from '../../../Context/ContextDashboard';

const initialData = {
    name:"",
    account_number: "",
    branch: "",
    ifsc: "",
    confirm_account_number: "",
};



function BankDetail() {
    const [loading, setLoading] = useState(false);
    const [response,setResponse] = useState({});
    const [formData, setFormData] = useState(initialData);
    const [formDataError, setFormDataError] = useState(initialData);
    const { message, setMessage, logout, handleEvent } = useContext(ContextDashboard);

    const submit = () => {
        const error = formValidation(formData);

        // Check if Account Number and Confirm Account Number match
        if (formData.account_number !== formData.confirm_account_number) {
            error.confirm_account_number = "Account numbers do not match"; // Set error if they don't match
        }

        setFormDataError({ ...formDataError, ...error });

        const param = {
            profile_id: getStorage("cust_profile_id") || "",
            event_name:"banking_details",
            account_branch: formData.branch,
            account_ifsc: formData.ifsc,
            account_number: formData.account_number,
            confirm_account_number: formData.confirm_account_number,
            account_name: formData.name,
            account_type_id:1,
            verification_consent:1
        };

        if (formData.maritalStatus !== "2") {
            delete error.spouseName;
        }

        if (isEmpty(error)) {
            setLoading(true);
            aboutCompany(param).then(resp => {
                setLoading(false);
                if (resp?.data?.Status === 1) {
                    setResponse(resp?.data);
                    setStorage("next_step",resp?.data?.Data?.next_step)
                    setStorage('percent',resp?.data?.Data?.step_percentage)
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
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (formDataError[name]) {
            setFormDataError({ ...formDataError, [name]: "" });
        }
    };

    return (
        <>
            <BoxWrapper className="w100">
                <div className="formmainBox flex">
                    <div className="left">
                        {/* <div className='center gap4 pointer' onClick={() => goBack(navigate, "/my-dashboard/adhar-upload")}>
                            <img src={arrowIcon} alt="" /> <span>Back</span>
                        </div> */}
                    </div>
                    <div className="right">
                        <h2>Banking Details *</h2>
                        <p>Share your bank details</p>
                        <FormWrapper>
                            <Alert setMessage={setMessage} message={message} />
                            <div className="inputBox">
                                <Input
                                    label="Name(as per Bank Account)"
                                    name="name"
                                    error={formDataError?.name}
                                    onChange={onChange}
                                    value={formData?.name}
                                    required={true}
                                />
                                <Input
                                    label="Branch Name"
                                    name="branch"
                                    error={formDataError?.branch}
                                    onChange={onChange}
                                    value={formData?.branch}
                                    required={true}
                                />
                                <Input
                                    label="Account Number"
                                    name="account_number"
                                    error={formDataError?.account_number}
                                    onChange={onChange}
                                    value={formData?.account_number}
                                    required={true}
                                />

                                <Input
                                    label="Confirm Account Number"
                                    name="confirm_account_number"
                                    error={formDataError?.confirm_account_number}
                                    onChange={onChange}
                                    value={formData.confirm_account_number}
                                    required={true}
                                    onPaste={(e) => e.preventDefault()}
                                />

                                <Input
                                    label="IFSC Code"
                                    name="ifsc"
                                    error={formDataError?.ifsc}
                                    onChange={onChange}
                                    value={formData.ifsc}
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

export default BankDetail;
