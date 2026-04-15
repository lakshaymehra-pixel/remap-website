import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "../css/legal.css";

const TermsandConditions = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4500/api/pages/public/terms-and-conditions')
      .then(r => r.json())
      .then(data => {
        if (data && data.content) setContent(data.content);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms and Conditions | Salary Top Up Loans India</title>
        <meta name="description" content="Review Salary Topup's terms & conditions for loan eligibility, approval, repayment, interest rates, and privacy policy." />
        <link rel="canonical" href="https://salarytopup.com/terms-and-conditions" />
      </Helmet>

      <section className="lg-hero">
        <div className="lg-hero-inner">
          <span className="lg-hero-badge"><i className="fas fa-file-contract"></i> Legal Document</span>
          <h1>Terms and Conditions</h1>
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
              {loading ? (
                <p style={{ color: '#94a3b8' }}>Loading...</p>
              ) : content ? (
                <div className="lg-cms-content" dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <>
                  <h2>Welcome to Salary Topup</h2>
                  <p>Powered by Baid Stock Broking Services Private Limited. If you visit our website and use our services, you agree to be bound by the following terms and conditions.</p>
                  <h2>1. Eligibility Criteria</h2>
                  <ul>
                    <li><strong>Age Requirement:</strong> You must be at least 18 years of age to apply for a loan.</li>
                    <li><strong>Residency Requirement:</strong> You must be a legal resident of the country.</li>
                    <li><strong>Bank Account Requirement:</strong> You must have a bank account in your own name.</li>
                  </ul>
                  <h2>2. Loan Application Process</h2>
                  <ul>
                    <li><strong>How to Apply:</strong> Visit the website, click on "Apply Now," and complete the online application process.</li>
                  </ul>
                  <h2>3. Loan Approval and Disbursement</h2>
                  <ul>
                    <li><strong>Approval Process:</strong> Once we evaluate your application and documentation, if approved, you will receive a loan offer.</li>
                  </ul>
                  <h2>4. Repayment &amp; Interest Rate Terms</h2>
                  <ul>
                    <li><strong>Interest Rates:</strong> Loan interest rates will be disclosed in the loan agreement, which is 1% per day.</li>
                  </ul>
                  <h2>5. Contact Us</h2>
                  <p><strong>Email:</strong> Customercare@salarytopup.com</p>
                  <p><strong>Phone:</strong> +91 9355753533</p>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default TermsandConditions;
