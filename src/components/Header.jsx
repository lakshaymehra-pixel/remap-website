import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/header.css";
import logo from "../images/logo.webp";

const Header = () => {
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
            <img src={logo} alt="SalaryTopUp" />
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
          <Link to="/apply-now" className="hdr-btn hdr-btn-apply" onClick={closeMenu}>APPLY NOW</Link>
          <Link to="/repay-loan" className="hdr-btn hdr-btn-pay" onClick={closeMenu}>PAY NOW</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
