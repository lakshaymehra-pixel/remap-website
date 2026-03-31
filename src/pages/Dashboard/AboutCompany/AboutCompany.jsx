import React, { useContext, useEffect, useState } from 'react';
import { BoxWrapper } from '../../../style';
import { FormWrapper } from '../../../components/loan/style';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';
import { aboutCompany, getDashboardData } from '../../../Utils/api';
import {formateDate, getStorage, goBack, isAlphabet, isEmpty, isNumber,setStorage } from '../../../Utils/common';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { formValidation } from '../../../Utils/formValidation';
import RadioButtons from '../../../components/ui/RadioButtons';
import ContextDashboard from '../../../Context/ContextDashboard';

const initialData = {
    workingType:"",
    landmark:"",
    companyName:"",
    department:"",
    company_type:"",
    designation:"",
    address1:"",
    address2:"",
    email:"",
    emp_since:"",
    pinCode:"",
}

const options =[
    {
        label:"Office",
        value:"WFO",
        name:"workingType",
    },
    {
        label:"Remote",
        value:"WFH",
        name:"workingType",
    },

]
const options2 =[
    {
        label:"SALES",
        value:"SALES",

    },
    {
        label:"CREDIT",
        value:"CREDIT",

    },
    {
        label:"ACCOUNTS",
        value:"ACCOUNTS",

    },
    {
      label:"FINANCE",
      value:"FINANCE",

  },
  {
    label:"BUSINESS",
    value:"BUSINESS",

},
{
  label:"OPERATIONS",
  value:"OPERATIONS",

},
{
  label:"TECHNOLOGY",
  value:"TECHNOLOGY",

},
{
  label:"ADMIN",
  value:"ADMIN",

},
{
  label:"HUMAN RESOURCES",
  value:"HUMAN RESOURCES",

},
]

const options3 =[
  {
      label:"Private",
      value:"1",

  },
  {
      label:"Public",
      value:"2",

  },
  {
      label:"Listed Public",
      value:"3",

  },
  {
    label:"State Government",
    value:"4",

},
{
  label:"Centeral Government",
  value:"5",

},
{
label:"Partnership Firm",
value:"6",

},
{
label:"Proprietorship Firm",
value:"7",

},
{
label:"Limited Liability Partnership(LLP)",
value:"8",

},
{
label:"Nbfc",
value:"9",

},
]

function AboutCompany() {
    const [loading, setLoading] = useState(false);
    // const [message, setMessage] = useState({});
    const [responce,setResponce] = useState({});
    const [formData, setFormData] = useState(initialData);
    const [formDataError, setFormDataError] = useState(initialData);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [pinCodeList, setPinCodeList] = useState([]);
    const [showSteps, setShowSteps] = useState(-1);
    const [toggle, setToggle] = useState(true);
    const [progressBar, setProgressBar] = useState(getStorage('percent'));

    const {message,setMessage,logout,handleEvent} = useContext(ContextDashboard);

    const submit = () =>{

      const error = formValidation(formData,["landmark","email"]);

        setFormDataError({...formDataError,...error});
        const param = {
          profile_id: getStorage("cust_profile_id") || "",
          event_name:"employment_details",
          pincode: formData.pinCode,
          // city:formData.city,
          // state: formData.state,
          address_2:formData.address2,
          address_1:formData.address1,
          // department:formData.department,
          company_type_id:formData.company_type,
          company_name:formData.companyName,
          landmark:formData.landmark || "",
          work_mode:formData.workingType,
          designation:formData.designation,
          emp_since:formateDate(formData.emp_since),
          office_email:formData.email,
      }

        if(isEmpty(error)){
           setLoading(true);
           aboutCompany(param).then(resp=>{
           setLoading(false);
        console.log(resp?.data)
        if(resp?.data?.Status === 1){
          setStorage("next_step",resp?.data?.Data?.next_step)
          setStorage('percent',resp?.data?.Data?.step_percentage)
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


const onChange = (e)=>{
  let {name, value} = e.target;


//   if((name === "state")){
//     StateCityList("getcity",value);
//     setFormData({...formData,[name]:value,city:"",pinCode:""});
//     setFormDataError({...formDataError,[name]:""});
// return;

//   }
//   if((name === "city")){
//     StateCityList("getpincode",value);
//     setFormData({...formData,[name]:value,pinCode:""});
//     setFormDataError({...formDataError,[name]:""});
//     return;
//   }

 setFormDataError({...formDataError,[name]:""});
  setFormData({...formData,[name]:value});

}

const onChangeDate = (date) => {
  const currentDate = new Date();
  const selectedDate = new Date(date);

  // Check if the selected date is in the future
  if (selectedDate > currentDate) {
    setFormData({...formData, emp_since: ""});  // Reset the value
    setFormDataError({...formDataError, emp_since: "Date cannot be in the future."});
  } else {
    setFormData({...formData, emp_since: date});
    setFormDataError({...formDataError, emp_since: ""});
  }
};

// const StateCityList = (type="getstate",id=null)=>{
//   const param ={
//     apiname:type,
//   }
//   if(!isEmpty(id)){
//     param.id = id;
//   }
//   getStateCityPincode(param).then((resp) =>{

//       if(resp?.data?.data){

//          if(type === "getstate"){
//           const data = resp.data.data.map((value) =>{
//             return {label:value.name,value:value.id};
//           })
//           setStateList(data)
//          }else if(type === "getcity"){
//           const data = resp.data.data.map((value) =>{
//             return {label:value.m_city_name,value:value.m_city_id};
//           })
//           setCityList(data);
//          } else{
//           const data = resp.data.data.map((value) =>{
//             return {label:value.name,value:value.name};
//           })
//           setPinCodeList(data);
//          }

//       }
//   })
// }


// useEffect(() =>{
//   StateCityList();
// },[]);

// useEffect(() => {
//   if (formData.state === "Select" || formData.state === "") {
//     console.log("The selected option is 'Select'");
//   } else {
//     //console.log("Selected option:", );
//     StateCityList("getcity",formData.state);
//   }
// }, [formData.state]);

// useEffect(() => {
//   if (formData.city === "Select" || formData.city === "") {
//     console.log("The selected option is 'Select'");
//   } else {

//     StateCityList("getpincode",formData.city);
//   }
// }, [formData.state]);


useEffect(() => {

  const params={
    profile_id: getStorage("cust_profile_id") || "",
  };

  getDashboardData(params).then(resp => {
      if (resp?.data?.Status === 1) {
          const dashboardData = resp?.data?.Data?.customer_employment_details || {};
          if (dashboardData) {
              setFormData(prev => ({
                  ...prev,
                  workingType: dashboardData?.emp_work_mode || "",
                  // email: dashboardData?.emp_email || "",
                  companyName: dashboardData?.employer_name || "",
                  department: dashboardData?.emp_department || "",
                  company_type: dashboardData?.companyid || "",
                  designation: dashboardData?.emp_designation || "",
                  address1: dashboardData?.emp_house || "",
                  address2: dashboardData?.emp_street || "",
                  // service_tenure: dashboardData.service_tenure || "",
                  // emp_since: dashboardData.emp_since || "",
                  landmark: dashboardData?.emp_landmark || "",
                  // city: dashboardData.ce_city_id || "",
                  pinCode: dashboardData?.emp_pincode || "",

              }));

              setProgressBar(resp?.data?.Steps?.steps?.step_complete_percent);
          }
      } else if (resp?.data?.Status === 5) {
          logout();
      }
  });
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
    <>
    {/* <ProgressBar value={`${progressBar}%`}>
      <div >
      </div>

  </ProgressBar> */}
    <br />
       <BoxWrapper  className="w100" >
        <div className="formmainBox flex">
          <div className="left">
            {/* <div className='center gap4 pointer' onClick={()=>goBack(navigate,"/my-dashboard/calculate-loan")} >
                <img src={arrowIcon} alt="" /> <span>Back</span>
            </div> */}
          </div>
          <div className="right">
            <h2>Employment Details</h2>
            <p></p>

            <FormWrapper>
            <Alert setMessage={setMessage} message={message}  />
            <div className="inputBox" style={{marginBottom:"25px"}}>
            <RadioButtons
              title='Are You Working From Office Or Home? '
              options={options} className="flex 5"
              cls={"margin-25"}
              value={formData.workingType}
              error={formDataError.workingType}
              onChange={onChange}
              required={true}
            />


            <Input
                  label="Your Organisation Name"
                  name="companyName"
                  error={formDataError?.companyName}
                  onChange={onChange}
                  value={formData?.companyName}
                  required={true}

                />
                  <Select
                  label="Department"
                  name="department"
                  placeholder='--select--'
                  error={formDataError?.department}
                  onChange={onChange}
                  value={formData?.department}
                  options={options2}
                  required={true}

                />
                <Select
                  label="Company Type"
                  name="company_type"
                  placeholder='--select--'
                  error={formDataError?.company_type}
                  onChange={onChange}
                  value={formData?.company_type}
                  options={options3}
                  required={true}

                />
                  <Input
                  label="Designation"
                  name="designation"
                  className='min-w100'
                  error={formDataError?.designation}
                  onChange={onChange}
                  value={formData?.designation}
                  required={true}

                />
                <Input
                  label="Official Email"
                  name="email"
                  error={formDataError?.email}
                  onChange={onChange}
                  value={formData?.email}
                  // required={true}

                />

              <Input
                label="Employment Since"
                name="emp_since"
                type="date"
                error={formDataError?.emp_since}
                onChange={onChangeDate}
                value={formData?.emp_since}
                required={true}
                max={new Date().toISOString().split('T')[0]}  // Disable future date selection
              />


                <div className='subheading min-w100'>
                ALSO, WHERE'S YOUR OFFICE?
                </div>

                <Input
                  label="Address Line 1"
                  name="address1"
                  error={formDataError?.address1}
                  onChange={onChange}
                  value={formData?.address1}
                  required={true}

                />
            <Input
                  label="Address Line 2 "
                  name="address2"
                  error={formDataError?.address2}
                  onChange={onChange}
                  value={formData?.address2}
                  required={true}

                />
                <Input
                  label="Landmark"
                  name="landmark"
                  error={formDataError?.landmark}
                  onChange={onChange}
                  value={formData?.landmark}
                  // required={true}


                />

            {/* <Input
                  label="State"
                  name="state"
                  error={formDataError?.state}
                  onChange={onChange}
                  value={formData?.state}
                  required={true}

                />
            <Input
                  label="City"
                  name="city"
                  error={formDataError?.city}
                  onChange={onChange}
                  value={formData?.city}
                  required={true}

                />*/}
            <Input
                  label="Pin Code"
                  name="pinCode"
                  error={formDataError?.pinCode}
                  onChange={onChange}
                  value={formData?.pinCode}
                  required={true}
                  maxLength={6}

                />

{/* <Select
                  label="State"
                  name="state"
                  placeholder="Select state"
                  error={formDataError?.state}
                  onChange={onChange}
                  value={formData?.state}
                  options={stateList}
                  disabled={isEmpty(stateList)}
                  required={true}

                /> */}
                 {/* <Select
                  label="City"
                  name="city"
                  placeholder="Select city"
                  error={formDataError?.city}
                  onChange={onChange}
                  value={formData?.city}
                  options={cityList}
                  disabled={isEmpty(stateList) || isEmpty(cityList)}
                  required={true}
                /> */}
                 {/* <Select
                  label="Pin Code"
                  name="pinCode"
                  placeholder="Select Pin Code"
                  error={formDataError?.pinCode}
                  onChange={onChange}
                  value={formData?.pinCode}
                  options={pinCodeList}
                  disabled={isEmpty(stateList) || isEmpty(cityList) || isEmpty(pinCodeList)}
                  required={true}
                /> */}

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

export default AboutCompany;