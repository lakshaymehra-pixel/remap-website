



import React, { useRef, useState } from 'react';

import { BoxWrapper } from '../../../style';
import arrowIcon from "../../../images/arrow.png"
import { FormWrapper } from '../../../components/loan/style';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';

import { useNavigate } from 'react-router-dom';
import { goBack, isEmpty } from '../../../Utils/common';

import { formValidation } from '../../../Utils/formValidation';
import PictureUpload from '../../../components/PictureUpload/PictureUpload';
import { ButtonWrapper } from '../../../components/ui/style';
import photoCapturIcon from "../../../images/photo-capture.svg";
import Webcam from 'react-webcam';
import TakeImage from '../../../components/TakeImage/TakeImage';


const initialData = {
    pinCode:"",
    city:"",
    state:"",
    landmark:"",
    address2:"",
    address1:"",
    residenceType:"",
}


function Ekyc() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({});
    const [responce,setResponce] = useState({});
    const [formData, setFormData] = useState(initialData);
    const [formDataError, setFormDataError] = useState(initialData);
    const [openCamera, setOpenCamera] = useState(false)
    const [aadharFront,setAadharFront] = useState("");
    const [aadharBack,setAadharBack] = useState("");

    const navigate = useNavigate();


  

    const submit = () =>{
     

        const error = formValidation(formData);

        setFormDataError({...formDataError,...error});
        const param = {
           
        }

        if(isEmpty(error)){
           setLoading(true);
    //     verifyPan(param).then(resp=>{
    //     setLoading(false);
    //     console.log(resp?.data)
    //     if(resp?.data?.Status === 1){
    //       setResponce(resp?.data);
    //       setMessage({ type: 'success', msg:resp?.data?.Message, place:"globle" });
    //     }else{
    //       setMessage({ type: 'error', msg: resp?.data?.Message, });
    //     }
        
        
    // })

        }

    
    }

  


  return (
       <BoxWrapper  className="w100" >
     

        <div className="formmainBox flex">
          <div className="left">
            <div className='center gap4 pointer' onClick={()=>goBack(navigate,"/my-dashboard/eligibility")} >
                <img src={arrowIcon} alt="" /> <span>Back</span>
            </div>
          </div>
          <div className="right">
            <h2>Complate Your KYC</h2>
            <p>Upload you document and complete the kyc.</p>
              
            <FormWrapper>
            <Alert setMessage={setMessage} message={message}  />
 
            <div className="inputBox">
             <div >
                <h2 className='subheading small'>Aadhar front side</h2>
                 <PictureUpload  setImage={setAadharFront}  image={aadharFront}/>
            
             </div>
             <div>
             <h2 className='subheading small'>Aadhar back side</h2>
                 <PictureUpload  setImage={setAadharBack}  image={aadharBack}/>
            
             </div>
              </div>
             
              
             
              <div className="button">
              <Button title="Continue" onClick={submit} loading={loading} />
              </div>
            </FormWrapper>
           
          </div>
        </div>

       </BoxWrapper>
    
  )
}

export default Ekyc;