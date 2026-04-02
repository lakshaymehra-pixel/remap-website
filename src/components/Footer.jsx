import { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "../css/footer.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.webp";
import skyline from "../images/footer-skyline.png";
import playstoreImg from "../images/playstore.webp";

const Footer = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const toggleMenu = (idx) => setOpenMenu(openMenu === idx ? null : idx);
  const [nlEmail, setNlEmail] = useState('');
  const [nlMsg, setNlMsg] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!nlEmail) return;
    try {
      const res = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: nlEmail })
      });
      const data = await res.json();
      setNlMsg(data.message || 'Subscribed!');
      setNlEmail('');
    } catch {
      setNlMsg('Something went wrong. Try again.');
    }
  };

  return (
    <footer className="ft">
      {/* Main Footer */}
      <div className="ft-main">
        <div className="ft-inner">

          {/* Col 1 — Logo + About */}
          <div className="ft-col ft-about">
            <img src={logo} alt="SalaryTopUp" className="ft-logo" />
            <p>Your trusted partner for emergency funds. We provide quick, collateral-free loans with transparent terms.</p>
            <div className="ft-getapp">
              <span>Get it on</span>
              <a href="https://play.google.com/store/apps/details?id=com.salarytopup.salarytopup" target="_blank" rel="noopener noreferrer" className="ft-playstore">
                <img src={playstoreImg} alt="Google Play" className="ft-playstore-img" />
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className={`ft-col ft-accordion ${openMenu === 0 ? "ft-acc-open" : ""}`}>
            <h4 onClick={() => toggleMenu(0)}>Quick Links <i className="fas fa-chevron-down ft-acc-icon"></i></h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3 — Support */}
          <div className={`ft-col ft-accordion ${openMenu === 1 ? "ft-acc-open" : ""}`}>
            <h4 onClick={() => toggleMenu(1)}>Support <i className="fas fa-chevron-down ft-acc-icon"></i></h4>
            <ul>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/apply-now">Apply Now</Link></li>
              <li><Link to="/repay-loan">Pay Now</Link></li>
            </ul>
          </div>

          {/* Col 4 — Legal */}
          <div className={`ft-col ft-accordion ${openMenu === 2 ? "ft-acc-open" : ""}`}>
            <h4 onClick={() => toggleMenu(2)}>Legal <i className="fas fa-chevron-down ft-acc-icon"></i></h4>
            <ul>
              <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/rate-and-terms">Rate & Term</Link></li>
            </ul>
          </div>

          {/* Col 5 — Contact */}
          <div className="ft-col ft-contact">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <FaPhoneAlt className="ft-ci" />
                <a href="tel:+919355753533">+91 93557 53533</a>
              </li>
              <li>
                <FaWhatsapp className="ft-ci" />
                <a href="https://wa.me/918448240723">+91 8448240723</a>
              </li>
              <li>
                <FaEnvelope className="ft-ci" />
                <a href="mailto:customercare@salarytopup.com">customercare@salarytopup.com</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="ft-bottom">
        <div className="ft-bottom-inner">
          {/* Left — Address + Social */}
          <div className="ft-btm-left">
            <div className="ft-address">
              <strong>Registered Office :</strong>
              <span>B-76, 2nd Floor, Wazirpur Industrial Area, Delhi – 110052</span>
            </div>
            <div className="ft-social">
              <span>Follow on</span>
              <a href="https://www.facebook.com/profile.php?id=61574094973748" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://x.com/SalaryTopup" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
              <a href="https://www.instagram.com/salary_topup" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://www.linkedin.com/company/salary-topup/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Center — RBI Info */}
          <div className="ft-btm-center">
            <p>RBI Registered NBFC Baid Stock Broking Services Private Limited<br />(Reg. No. B-14.02553)</p>
          </div>

          {/* Right — Newsletter */}
          <div className="ft-btm-right">
            <strong>Subscribe to Our Newsletter</strong>
            <span>Stay updated with our latest offers and news.</span>
            <form className="ft-newsletter" onSubmit={handleSubscribe}>
              <input type="email" placeholder="Enter your email address" value={nlEmail} onChange={e => { setNlEmail(e.target.value); setNlMsg(''); }} required />
              <button type="submit">Subscribe</button>
            </form>
            {nlMsg && <span style={{ fontSize: '0.78rem', color: '#4ade80', marginTop: '6px', display: 'block' }}>{nlMsg}</span>}
          </div>
        </div>
      </div>

      {/* Copyright + Skyline together */}
      <div className="ft-sky-copy">
        <p className="ft-copy-text">&copy; 2026 Salary TopUp. All Right Reserved</p>
        <div className="ft-skyline">
          <img src={skyline} alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
