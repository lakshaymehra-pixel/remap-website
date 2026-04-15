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

    {/* Floating Action Button */}
    <div className="fab-wrap">
      {/* Sub buttons — shown on hover */}
      {/* Call */}
      <a href="tel:+919355753533" className="fab-sub fab-call" aria-label="Call Us">
        <span className="fab-label">Call Us</span>
        <span className="fab-sub-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
          </svg>
        </span>
      </a>

      {/* Apply */}
      <a href="/apply-now" className="fab-sub fab-apply" aria-label="Apply Now">
        <span className="fab-label">Apply Now</span>
        <span className="fab-sub-icon">
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="2" width="16" height="20" rx="2" fill="#2563eb"/>
            <rect x="7" y="7" width="10" height="1.5" rx="1" fill="white"/>
            <rect x="7" y="10.5" width="10" height="1.5" rx="1" fill="white"/>
            <rect x="7" y="14" width="6" height="1.5" rx="1" fill="white"/>
            <circle cx="17" cy="17" r="3.5" fill="#22c55e"/>
            <path d="M15.5 17l1 1 2-2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </a>

      {/* Play Store */}
      <a href="https://play.google.com/store/apps/details?id=com.salarytopup" target="_blank" rel="noopener noreferrer" className="fab-sub fab-play" aria-label="Download App">
        <span className="fab-label">Download App</span>
        <span className="fab-sub-icon">
          <i className="fab fa-google-play" style={{fontSize:'20px', background:'linear-gradient(135deg,#00c853,#2979ff,#ff6d00,#d50000)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}></i>
        </span>
      </a>

      {/* Main Button */}
      <button className="fab-main" aria-label="Menu">
        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
      </button>
    </div>

  </div>
  )
}

export default Layout;