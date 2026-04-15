import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/header.css";
import defaultLogo from "../images/logo.webp";
import { useSiteSettings } from "../App";

const Header = () => {
  const { logoUrl: ctxLogo } = useSiteSettings();
  const [siteLogo, setSiteLogo] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const base = process.env.REACT_APP_API_URL || 'http://localhost:4500';
    fetch(`${base}/api/site-settings/public`)
      .then(r => r.json())
      .then(data => { if (data.logoUrl) setSiteLogo(data.logoUrl); })
      .catch(() => {});
  }, []);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About us", path: "/about-us" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
    { label: "Blog", path: "/blog" },
  ];

  return (
    <>
      <header className={`hdr ${isSticky ? "hdr-sticky" : ""}`}>
        {/* Logo */}
        <div className="hdr-logo">
          <Link to="/">
            <img src={siteLogo || ctxLogo || defaultLogo} alt="SalaryTopUp" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hdr-nav">
          <ul className="hdr-menu">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`hdr-link ${location.pathname === item.path ? "hdr-link-active" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hdr-actions">
            <Link to="/apply-now" className="hdr-btn hdr-btn-apply">APPLY NOW</Link>
            <Link to="/repay-loan" className="hdr-btn hdr-btn-pay">PAY NOW</Link>
          </div>
        </nav>

        {/* Hamburger — mobile only */}
        <div className="hdr-hamburger" onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>
      </header>

      {/* Mobile Sidebar — outside header so z-index works correctly */}
      {menuOpen && (
        <div className="hdr-overlay" onClick={closeMenu}></div>
      )}
      <div className={`hdr-mobile-nav ${menuOpen ? "hdr-mobile-nav-open" : ""}`}>
        <div className="hdr-close" onClick={closeMenu}>&times;</div>
        <ul className="hdr-mobile-menu">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={closeMenu}
                className={`hdr-link ${location.pathname === item.path ? "hdr-link-active" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hdr-mobile-actions">
          <a href="https://play.google.com/store/apps/details?id=com.salarytopup" target="_blank" rel="noreferrer" className="hdr-btn-playstore" onClick={closeMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512"><path fill="#fff" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.7-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c17.1-9.9 17.1-34.9-.1-60.8zm-234.5 91.5L47 511.8c13 6.8 30.5 6.3 43.5-1.6l245.7-141.3-97.5-51.8z"/></svg>
            <span><small>GET IT ON</small><strong>Google Play</strong></span>
          </a>
          <Link to="/apply-now" className="hdr-btn hdr-btn-apply" onClick={closeMenu}>APPLY NOW</Link>
          <Link to="/repay-loan" className="hdr-btn hdr-btn-pay" onClick={closeMenu}>PAY NOW</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
