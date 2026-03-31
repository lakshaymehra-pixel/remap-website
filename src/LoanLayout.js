import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Footer from "./components/Footer";
import DashboardHeader from "./components/DashboardHeader/DashboardHeader";

import SideBar from "./components/Sidebar/SideBar";
import { getStorage, isEmpty } from "./Utils/common";
import LoanLayoutContext from "./LoanLayoutContext";




function LoanLayout() {

  const [sideBar,setSideBar] = useState(false);
  const [login,setLogin] = useState(false);
  const navigate = useNavigate();



  useEffect(() =>{
    if(window.innerWidth < 768){
      setSideBar(true)
    }
  },[]);
  const  checklogin = getStorage("token");
  useEffect(() =>{
     if(!isEmpty(checklogin)){
      setLogin(true);
     }else{
     navigate('/apply-now')
     }
  },[])

 




 
  if(login){
    return (
      <LoanLayoutContext>
      <div className="wrapper dashboardMain" style={{background:"#F9F9F9"}}>
        <div id="snackbar"></div>
        <div className="full-width">
          <DashboardHeader toggle={sideBar} setToggle={setSideBar} />
        </div>
        <main className={`full-width mainBox  flex ${sideBar?"close":""}`} style={{marginTop:"20px"}}>
  <SideBar toggle={sideBar} setToggle={setSideBar}   />
       <div className= {`mainPage ${sideBar?"close":""}`}>
       <Outlet />
       </div>
         
        </main>
        <footer className="">
          <Footer />
        </footer>
      </div>
      
      </LoanLayoutContext>
    );
  }else{
 <>
 </>
  }
  
}

export default LoanLayout;


