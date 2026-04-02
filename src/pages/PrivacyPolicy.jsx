import React from "react";
import { Helmet } from "react-helmet";
import "../css/legal.css";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Salary Top Up Loan Services</title>
        <meta name="description" content="Learn how Salary Topup collects, uses, and protects your data." />
        <link rel="canonical" href="https://salarytopup.com/privacy-policy" />
      </Helmet>

      <section className="lg-hero">
        <div className="lg-hero-inner">
          <span className="lg-hero-badge"><i className="fas fa-shield-alt"></i> Legal Document</span>
          <h1>Privacy Policy</h1>
          <p className="lg-hero-meta">Last updated: January 2025 &nbsp;·&nbsp; Baid Stock Broking Services Pvt. Ltd.</p>
        </div>
        <div className="lg-hero-wave">
          <svg viewBox="0 0 1440 36" preserveAspectRatio="none"><path d="M0,18 C360,36 1080,0 1440,18 L1440,36 L0,36 Z" fill="#f5f7fa"/></svg>
        </div>
      </section>

      <div className="lg-page">
        <div className="lg-layout">
          <main className="lg-content" style={{ maxWidth: '100%' }}>
            <div className="lg-card">
              <h2>Our Privacy Commitment</h2>
              <p><strong>Baid Stock Broking Services Private Limited</strong> operates the salarytopup.com website. This Privacy Policy explains how we collect, use, and share your personal information.</p>

              <h2>1. Information We Collect</h2>
              <ul>
                <li><strong>Personal Information:</strong> Name, address, email, phone number, date of birth.</li>
                <li><strong>Financial Information:</strong> Bank account details, credit history.</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <ul>
                <li>To provide and maintain our services.</li>
                <li>To process your transactions and manage your accounts.</li>
                <li>To verify your identity and prevent fraud.</li>
              </ul>

              <h2>3. Data Security</h2>
              <p>We implement appropriate technical and organisational measures to protect your personal information from unauthorised access.</p>

              <h2>4. Contact Us</h2>
              <p><strong>Phone:</strong> +91 9355753533</p>
              <p><strong>Email:</strong> Customercare@salarytopup.com</p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
