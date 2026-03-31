import React, { useEffect,useContext, useState } from 'react';
import { BoxWrapper } from '../../../style';
import arrowIcon from "../../../images/arrow.png"
import { FormWrapper } from '../../../components/loan/style';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';
import { getDashboardData, getIncomeDetails} from '../../../Utils/api';
import { useNavigate } from 'react-router-dom';
import { getStorage, goBack, isAlphabet, isEmpty, isNumber,setStorage } from '../../../Utils/common';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { formValidation } from '../../../Utils/formValidation';
import RadioButtons from '../../../components/ui/RadioButtons';
import ContextDashboard from '../../../Context/ContextDashboard';
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

const initialData = {
    employmentType:"",
    monthlyIncome:"",
    // organization:"",
    nextSalaryDate:"",
    ModeIncomeReceived:"",
    // obligations:"",
}

const options =[
    {
        label:"Salaried",
        value:"1",
        name:"employmentType",
    },
    {
      label:"Self-Employed",
      value:"2",
      name:"employmentType",
  }

     
]
const options2 =[
    {
        label:"Bank",
        value:"bank",
        name:"ModeIncomeReceived",
    },
    {
        label:"Cheque",
        value:"cheque",
        name:"ModeIncomeReceived",
    },
    {
        label:"Cash",
        value:"cash",
        name:"ModeIncomeReceived",
    },
     
]

function CapturIncomeDetails() {
    const [loading, setLoading] = useState(false);
    const [responce,setResponce] = useState({});
    const [formData, setFormData] = useState(initialData);
    const [formDataError, setFormDataError] = useState(initialData);
    const [showSteps, setShowSteps] = useState(-1);
    const [toggle, setToggle] = useState(true);
    const [progressBar, setProgressBar] = useState(getStorage("step_percent"));
    const navigate = useNavigate();
    const {message,setMessage, logout,setps,handleEvent} = useContext(ContextDashboard);

    const submit = () =>{
        const error = formValidation(formData);
        console.log("error",error)
        setFormDataError({...formDataError,...error});
        const param = {
          profile_id: getStorage("cust_profile_id") || "",
          event_name:"income_details",
          income_type_id:formData.employmentType,
          salary_mode_id:formData.ModeIncomeReceived=="bank"?"1":formData.ModeIncomeReceived=="cheque"?"2":formData.ModeIncomeReceived=="cash"?"3":"",
          salary_date:formData.nextSalaryDate,
          monthly_income:formData.monthlyIncome 
      }
  
        if(isEmpty(error)){
           setLoading(true);
           getIncomeDetails(param).then(resp=>{
        setLoading(false);
        if(resp?.data?.Status === 1){
          setStorage("next_step",resp?.data?.Data?.next_step)
          setStorage("step_percent",resp?.data?.Data?.step_percentage)
          setResponce(resp?.data);
          setMessage({ type: 'success', msg:resp?.data?.Message, place:"globle" });
          handleEvent(getStorage('next_step'));
        }else if(resp?.data?.Status === 4){
          logout();
        }else{
          setMessage({ type: 'error', msg: resp?.data?.Message, });
        }      
    })
    }  
    }

    const handleIncomeChange = (e) => {
      const { value } = e.target;
  
      // Allow only numbers and restrict input to a maximum of 10 digits
      if (/^\d{0,7}$/.test(value)) {
        setFormData({ ...formData, monthlyIncome: value });
        setFormDataError({ ...formDataError, monthlyIncome: "" });
      }
    };
  
const onChange = (e)=>{
  let {name, value} = e.target;  
  setFormData({...formData,[name]:value});
  setFormDataError({...formDataError,[name]:""});
}

const onChangeDate = (date) => {
  const currentDate = new Date();
  const selectedDate = new Date(date);
  
  // Check if the selected date is in the future
  if (selectedDate > currentDate) {
    setFormData({...formData, nextSalaryDate: ""});  // Reset the value
    setFormDataError({...formDataError, nextSalaryDate: "Date cannot be in the future."});
  } else {
    setFormData({...formData, nextSalaryDate: date});
    setFormDataError({...formDataError, nextSalaryDate: ""});
  }
};

useEffect(() => {

  const params={
    profile_id: getStorage("cust_profile_id") || "", 
  };
  getDashboardData(params).then(resp=>{
    if(resp?.data?.Status===1){
    const dashboardData =resp?.data || {};
    if (dashboardData) {
        // Update form data with fetched dashboard data
        setFormData(prev => ({
            ...prev,
            employmentType: dashboardData.Data.profile_details.income_type_id || "",
            // monthlyIncome: dashboardData.monthly_salary || "",
            // organization: dashboardData.Data.profile_details.company_name || "",
            ModeIncomeReceived: dashboardData.Data.profile_details.income_type_id || "", 
            nextSalaryDate:dashboardData.Data.profile_details.salary_date || "",
            monthlyIncome: dashboardData.Data.profile_details.monthly_income || "", 
      
        }));
    }
  }
})
}, [logout]);

// useEffect(() => {
//   if (!isEmpty(setps)) {
//       checkStep(setps);
//   }
// }, [setps]);

// const checkStep = (data) => {
//   const steps = (data?.step_stage - 1);
//   if (data?.step_complete_percent === 100) {
//       setToggle(false);
//   }
//   setShowSteps(steps);
// };

  return (
    <><ProgressBar value={`${progressBar}%`}>

      <div >
       
      </div>
  
  </ProgressBar><br/>
       <BoxWrapper  className="w100" >
        <div className="formmainBox flex">
          <div className="left">
            <div className='center gap4 pointer' onClick={()=>goBack(navigate,"/my-dashboard/")} >
                <img src={arrowIcon} alt="" /> <span>Back</span>
            </div>
          </div>
          <div className="right">
            <h2>Income Details</h2>
            <p>Share with us a bit about yourself.</p>
         
            <FormWrapper>
            <Alert setMessage={setMessage} message={message}  />
            <div className="inputBox" style={{marginBottom:"25px"}}>
            <RadioButtons  title='Select Employment Type' options={options} className="flex 5" cls={"margin-25"} value={formData.employmentType} error={formDataError.employmentType} onChange={onChange} required={true} />
           
            <Input
                  label="Monthly Income *"
                  name="monthlyIncome"
                  error={formDataError?.monthlyIncome}
                  onChange={handleIncomeChange}
                  value={formData?.monthlyIncome}
                  required={true}
                  type='number'                  
                />

            {/* <Input
                  label="Organization Name"
                  name="organization"
                   className='min-w100'
                  error={formDataError?.organization}
                  onChange={onChange}
                  value={formData?.organization}
                  required={true}                  
                /> */}

                
            <Input
                  label="Last Salary Date"
                  name="nextSalaryDate"
                  type='date'
                  error={formDataError?.nextSalaryDate}
                  onChange={onChangeDate}
                  value={formData?.nextSalaryDate}
                  required={true}
                  max={new Date().toISOString().split('T')[0]}  // Disable future date selection
                />
               
               {/* <Input
                  label="Obligations"
                  name="obligations"
                  placeholder="Please enter your monthly rent, bills"
                  type='number'
                  error={formDataError?.obligations}
                  onChange={onChange}
                  value={formData?.obligations}                 
                /> */}

           <RadioButtons  title='Mode of Salary Received' options={options2} className="flex "  value={formData.ModeIncomeReceived} error={formDataError.ModeIncomeReceived} onChange={onChange} required={true}/>
              </div>
              <div>
              
              </div>
              <div className="button">
              <Button title="Continue" onClick={submit} loading={loading} />
              </div>
            </FormWrapper>
           
          </div>
        </div>

       </BoxWrapper>
    </>
  )
}

export default CapturIncomeDetails;