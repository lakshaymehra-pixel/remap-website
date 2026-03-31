import React, { useEffect } from "react";
import '../css/Common.css';

import Login from "../components/loan/Login/Login";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../Utils/common.js";

const ApplyForLoan = (props) => {
   const navigate = useNavigate();

  const  checklogin = sessionStorage.getItem("token");
useEffect(() =>{



   if(!isEmpty(checklogin)){
    navigate('/my-dashboard/');
   }
},[checklogin])

  return (
    <>
      <div className="page_wrapper">
        <Login />
      </div>

    </>
  );
};

export default ApplyForLoan;
