import React from 'react';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import './css/Common.css'



function Layout() {
  return (
    <div className="wrapper" style={{width:"100%", maxWidth:"100vw"}}>
    <div id="snackbar"></div>
    <Header />
    <main className="main-content" style={{width:"100%"}}>
      <Outlet />
    </main>
    <footer className="">
      <Footer />
    </footer>
  </div>
  )
}

export default Layout;