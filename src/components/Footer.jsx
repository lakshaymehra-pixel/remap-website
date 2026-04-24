import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "../css/footer.css";
import { Link } from "react-router-dom";
import defaultLogo from "../images/logo.webp";
import { useSiteSettings } from "../App";
import playstoreImg from "../images/playstore.webp";

const DEFAULTS = {
  description: 'Your trusted partner for emergency funds. We provide quick, collateral-free loans with transparent terms.',
  phone1: '+91 93557 53533',
  whatsapp: '+91 8448240723',
  email: 'customercare@salarytopup.com',
  address: 'B-76, 2nd Floor, Wazirpur Industrial Area, Delhi – 110052',
  rbiText: 'RBI Registered NBFC Baid Stock Broking Services Private Limited (Reg. No. B-14.02553)',
  copyright: '© 2026 Salary Topup. All Right Reserved',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61574094973748',
  twitterUrl: 'https://x.com/SalaryTopup',
  instagramUrl: 'https://www.instagram.com/salary_topup',
  linkedinUrl: 'https://www.linkedin.com/company/salary-topup/',
  playstoreUrl: 'https://play.google.com/store/apps/details?id=com.salarytopup.salarytopup',
};

const Footer = () => {
  const { logoUrl: ctxLogo } = useSiteSettings();
  const [settings, setSettings] = useState(DEFAULTS);
  const [siteLogo, setSiteLogo] = useState('');
  const [openMenu, setOpenMenu] = useState(null);
  const toggleMenu = (idx) => setOpenMenu(openMenu === idx ? null : idx);

  useEffect(() => {
    const base = process.env.REACT_APP_API_URL || 'https://backend-production-bf30.up.railway.app';
    fetch(`${base}/api/footer-settings/public`)
      .then(r => r.json())
      .then(data => setSettings(s => ({ ...s, ...data })))
      .catch(() => {});
    fetch(`${base}/api/site-settings/public`)
      .then(r => r.json())
      .then(data => { if (data.logoUrl) setSiteLogo(data.logoUrl); })
      .catch(() => {});
  }, []);

  return (
    <footer className="ft">

      {/* ── Top Section ── */}
      <div className="ft-top">
        <div className="ft-top-inner">

          {/* Col 1 — Logo + desc + playstore */}
          <div className="ft-col ft-about">
            <img src={settings.logoUrl || siteLogo || ctxLogo || defaultLogo} alt="Salary Topup" className="ft-logo" />
            <p>{settings.description}</p>
            <div className="ft-getapp">
              <span>Get it on</span>
              <a href={settings.playstoreUrl} target="_blank" rel="noopener noreferrer" className="ft-playstore">
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
              <li><Link to="/career">Career</Link></li>
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
              <li><Link to="/terms-and-conditions">Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/rate-and-terms">Rate &amp; Term</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Combined Contact Box ── */}
      <div className="ft-contact-box-wrap">
        <div className="ft-contact-box">

          {/* Pills Row */}
          <div className="ft-pills-row">
            <a href={`tel:${settings.phone1}`} className="ft-pill">
              <FaPhoneAlt className="ft-pill-icon" />
              <span>{settings.phone1}</span>
            </a>
            <a href={`mailto:${settings.email}`} className="ft-pill">
              <FaEnvelope className="ft-pill-icon" />
              <span>{settings.email}</span>
            </a>
            <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="ft-pill">
              <FaWhatsapp className="ft-pill-icon" />
              <span>{settings.whatsapp}</span>
            </a>
          </div>

          {/* Bottom Row */}
          <div className="ft-bottom-inner">

            {/* Address */}
            <div className="ft-btm-addr">
              <FaMapMarkerAlt className="ft-addr-icon" />
              <div>
                <strong>Registered Office :</strong>
              <span>{settings.address}</span>
            </div>
          </div>

          {/* Social */}
          <div className="ft-social">
            <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>

          {/* RBI */}
          <div className="ft-btm-rbi">
            <span>{settings.rbiText}</span>
          </div>

          </div>{/* end ft-bottom-inner */}
        </div>{/* end ft-contact-box */}
      </div>{/* end ft-contact-box-wrap */}

      {/* ── Copyright ── */}
      <div className="ft-copyright">
        <span>{settings.copyright}</span>
      </div>

    </footer>
  );
};

export default Footer;
