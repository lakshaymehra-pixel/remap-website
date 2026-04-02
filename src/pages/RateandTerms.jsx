import React from "react";
import { Helmet } from "react-helmet";
import "../css/legal.css";

const RateandTerms = () => {
  return (
    <>
      <Helmet>
        <title>Rate & Terms | Salary Top Up Loan Services</title>
        <meta name="description" content="Get instant financial support with Salary Topup online salary loan application." />
        <link rel="canonical" href="https://salarytopup.com/rate-and-terms" />
      </Helmet>

      <section className="lg-hero">
        <div className="lg-hero-inner">
          <span className="lg-hero-badge"><i className="fas fa-percentage"></i> Legal Document</span>
          <h1>Rate &amp; Terms</h1>
          <p className="lg-hero-meta">Last updated: January 2025 &nbsp;·&nbsp; Salary Topup by Baid Stock Broking Services Pvt. Ltd.</p>
        </div>
        <div className="lg-hero-wave">
          <svg viewBox="0 0 1440 36" preserveAspectRatio="none"><path d="M0,18 C360,36 1080,0 1440,18 L1440,36 L0,36 Z" fill="#f5f7fa"/></svg>
        </div>
      </section>

      <div className="lg-page">
        <div className="lg-layout">
          <main className="lg-content" style={{ maxWidth: '100%' }}>
            <div className="lg-card">
              <h2>Loan Rate &amp; Terms</h2>
              <p>All loan rates and terms are transparent and disclosed before you accept any offer. Salary Topup is committed to zero hidden charges.</p>

              <h2>1. Loan Amount</h2>
              <ul>
                <li><strong>Minimum Loan:</strong> ₹5,000</li>
                <li><strong>Maximum Loan:</strong> ₹1,00,000</li>
              </ul>

              <h2>2. Interest Rate</h2>
              <ul>
                <li><strong>Rate:</strong> 1% per day on the outstanding principal amount.</li>
                <li><strong>Annualised Rate:</strong> Up to 365% per annum.</li>
              </ul>

              <h2>3. Loan Tenure</h2>
              <ul>
                <li><strong>Minimum Tenure:</strong> 7 days</li>
                <li><strong>Maximum Tenure:</strong> 40 days</li>
              </ul>

              <h2>4. Fees &amp; Charges</h2>
              <ul>
                <li><strong>Processing Fee:</strong> Disclosed at the time of application.</li>
                <li><strong>No Hidden Charges:</strong> All fees are clearly disclosed before loan acceptance.</li>
              </ul>

              <h2>5. Contact Us</h2>
              <p><strong>Email:</strong> Customercare@salarytopup.com</p>
              <p><strong>Phone:</strong> +91 9355753533</p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default RateandTerms;
