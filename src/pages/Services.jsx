import React from "react";
import "../css/service.css";
import { Link } from "react-router-dom";
import instant from ".././images/instant.webp";
import minimal from ".././images/minimal.webp";
import online from ".././images/online.jpg";
import flexible from ".././images/flexible.webp";
import repayment from ".././images/repayment.webp";
import collateral from ".././images/collateral.webp";
import { Helmet } from "react-helmet";

const services = [
  {
    img: instant,
    icon: "fas fa-bolt",
    title: "Quick Approval",
    desc: "At Salary Topup, we offer fast loan approvals — often within minutes. No long waits, no delays.",
    badge: "Fastest",
  },
  {
    img: minimal,
    icon: "fas fa-file-alt",
    title: "Minimal Paperwork",
    desc: "Personal loans with minimal paperwork — simpler and faster than traditional banks.",
    badge: "Easy",
  },
  {
    img: online,
    icon: "fas fa-mobile-alt",
    title: "Digital Application",
    desc: "Salary Topup lets you apply online — anytime, anywhere. 100% paperless process.",
    badge: "Digital",
  },
  {
    img: flexible,
    icon: "fas fa-sliders-h",
    title: "Flexible Loan",
    desc: "Short-term loans with flexible eligibility, custom amounts, and faster approvals tailored for you.",
    badge: "Flexible",
  },
  {
    img: repayment,
    icon: "fas fa-calendar-check",
    title: "Easy Repayment",
    desc: "Repay personal loans within 7 to 40 days. Simple, transparent repayment schedule.",
    badge: "Simple",
  },
  {
    img: collateral,
    icon: "fas fa-shield-alt",
    title: "Collateral-Free",
    desc: "Personal loans are fully unsecured — no need to pledge any asset like a house or vehicle.",
    badge: "Secure",
  },
];

const stats = [
  { number: "10 min", label: "Average Approval", icon: "fas fa-clock" },
  { number: "15,000+", label: "Loans Disbursed", icon: "fas fa-hand-holding-usd" },
  { number: "100%", label: "Secure Process", icon: "fas fa-lock" },
  { number: "10,000+", label: "Happy Customers", icon: "fas fa-users" },
];

const steps = [
  { step: "01", icon: "fas fa-user-plus", title: "Register", desc: "Create your free account in under 2 minutes." },
  { step: "02", icon: "fas fa-file-upload", title: "Upload Docs", desc: "Submit PAN, Aadhaar & bank statement digitally." },
  { step: "03", icon: "fas fa-check-circle", title: "Get Approved", desc: "AI-powered instant approval within 10 minutes." },
  { step: "04", icon: "fas fa-money-bill-wave", title: "Get Money", desc: "Funds credited directly to your bank account." },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Instant Salary Loans Online – Fast, Flexible & Secure</title>
        <meta property="og:title" content="Instant Salary Loans Online – Fast, Flexible & Secure" />
        <meta name="description" content="Get instant approval, minimal paperwork & secure salary loans online. Trusted by 10,000+ customers. No collateral required – Apply now with Salary Top up." />
        <meta property="og:description" content="Get instant approval, minimal paperwork & secure salary loans online. Trusted by 10,000+ customers. No collateral required – Apply now with Salary Top up." />
        <link rel="canonical" href="https://salarytopup.com/services" />
      </Helmet>

      {/* ===== HERO ===== */}
      <section className="sv-hero">
        <div className="sv-hero-overlay"></div>
        <div className="sv-container">
          <div className="sv-hero-content">
            <span className="sv-hero-badge"><i className="fas fa-star"></i> Trusted by 1 Lakh+ Customers</span>
            <h1>Instant Loans <span className="sv-accent">You Can Trust</span></h1>
            <p>Quick, transparent salary loans for instant access to funds — your trusted financial partner for every need.</p>
            <div className="sv-hero-btns">
              <Link to="/apply-now" className="sv-btn-primary">Apply Now <i className="fas fa-arrow-right"></i></Link>
            </div>
          </div>
        </div>
        <div className="sv-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f5f7fa"/></svg>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="sv-stats">
        <div className="sv-container">
          <div className="sv-stats-grid">
            {stats.map((s, i) => (
              <div className="sv-stat-card" key={i}>
                <div className="sv-stat-icon"><i className={s.icon}></i></div>
                <div className="sv-stat-number">{s.number}</div>
                <div className="sv-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="sv-services">
        <div className="sv-container">
          <div className="sv-section-header">
            <span className="sv-section-tag">What We Offer</span>
            <h2>Our <span className="sv-accent">Services</span></h2>
            <p>Solutions designed to match your financial goals — fast, flexible, and fully digital.</p>
          </div>
          <div className="sv-grid">
            {services.map((s, i) => (
              <div className="sv-card" key={i}>
                <div className="sv-card-img-wrap">
                  <img src={s.img} alt={s.title} className="sv-card-img" />
                  <span className="sv-card-badge">{s.badge}</span>
                </div>
                <div className="sv-card-body">
                  <div className="sv-card-icon"><i className={s.icon}></i></div>
                  <h3 className="sv-card-title">{s.title}</h3>
                  <p className="sv-card-desc">{s.desc}</p>
                  <Link to="/apply-now" className="sv-card-btn">Apply Now <i className="fas fa-arrow-right"></i></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="sv-cta">
        <div className="sv-container">
          <div className="sv-cta-inner">
            <div className="sv-cta-text">
              <h2>Ready for an Instant Loan?</h2>
              <p>Apply now and get your funds disbursed in as little as 10 minutes after approval.</p>
            </div>
            <div className="sv-cta-btns">
              <Link to="/apply-now" className="sv-btn-primary">Apply Now <i className="fas fa-arrow-right"></i></Link>
              <a href="https://play.google.com/store/apps/details?id=com.salarytopup.salarytopup" target="_blank" rel="noopener noreferrer" className="sv-btn-outline sv-btn-outline-light"><i className="fas fa-download"></i> Download App</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
