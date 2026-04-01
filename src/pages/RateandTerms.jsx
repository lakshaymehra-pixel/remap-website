import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../css/legal.css";

const RateandTerms = () => {
  return (
    <>
      <Helmet>
        <title>Rate & Terms | Salary Top Up Loan Services</title>
        <meta property="og:title" content="Rate & Terms | Salary Top Up Loan Services" />
        <meta name="description" content="Get instant financial support with Salary Topup online salary loan application. Apply now for quick approval, flexible terms, and convenient repayment options." />
        <meta property="og:description" content="Get instant financial support with Salary Topup online salary loan application. Apply now for quick approval, flexible terms, and convenient repayment options." />
        <link rel="canonical" href="https://salarytopup.com/rate-and-terms" />
      </Helmet>

      {/* ===== HERO ===== */}
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

          {/* ===== SIDEBAR ===== */}
          <aside className="lg-sidebar">
            <div className="lg-toc">
              <div className="lg-toc-title">On This Page</div>
              <ul>
                <li><a href="#loan-amount">Loan Amount</a></li>
                <li><a href="#interest">Interest Rate</a></li>
                <li><a href="#tenure">Loan Tenure</a></li>
                <li><a href="#fees">Fees & Charges</a></li>
                <li><a href="#repayment">Repayment</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>
          </aside>

          {/* ===== CONTENT ===== */}
          <main className="lg-content">
            <div className="lg-card">
              <h2 className="lg-main-title">Loan Rate &amp; Terms</h2>
              <p className="lg-subtitle">
                All loan rates and terms are transparent and disclosed before you accept any offer. Salary Topup is committed to zero hidden charges.
              </p>

              <h2 id="loan-amount"><span className="lg-sec-num">1</span> Loan Amount</h2>
              <ul>
                <li><strong>Minimum Loan:</strong> ₹5,000</li>
                <li><strong>Maximum Loan:</strong> ₹1,00,000</li>
                <li>Actual amount depends on your monthly income, credit profile, and repayment history.</li>
              </ul>

              <h2 id="interest"><span className="lg-sec-num">2</span> Interest Rate</h2>
              <ul>
                <li><strong>Rate:</strong> 1% per day on the outstanding principal amount.</li>
                <li><strong>Annualised Rate:</strong> Up to 365% per annum (varies by tenure).</li>
                <li>All interest is calculated on a daily basis and disclosed in your loan agreement.</li>
              </ul>

              <h2 id="tenure"><span className="lg-sec-num">3</span> Loan Tenure</h2>
              <ul>
                <li><strong>Minimum Tenure:</strong> 7 days</li>
                <li><strong>Maximum Tenure:</strong> 40 days</li>
                <li>Tenure is mutually agreed upon at the time of loan approval.</li>
              </ul>

              <h2 id="fees"><span className="lg-sec-num">4</span> Fees &amp; Charges</h2>
              <ul>
                <li><strong>Processing Fee:</strong> Disclosed at the time of application.</li>
                <li><strong>Late Payment Fee:</strong> Additional charges apply if payment is not made by the due date.</li>
                <li><strong>Prepayment:</strong> Allowed — may result in reduced interest benefit.</li>
                <li><strong>No Hidden Charges:</strong> All fees are clearly disclosed before loan acceptance.</li>
              </ul>

              <h2 id="repayment"><span className="lg-sec-num">5</span> Repayment</h2>
              <ul>
                <li>Repayment is made via bank transfer, UPI, or other digital payment methods.</li>
                <li>Salary Topup will send reminders before the due date.</li>
                <li>Failure to repay on time may affect your credit score and result in additional penalties.</li>
                <li>Contact our support team immediately if you are unable to repay on the due date.</li>
              </ul>

              <h2 id="contact"><span className="lg-sec-num">✉</span> Contact Us</h2>
              <p>For any queries regarding rates and terms, please reach out to us:</p>
              <div className="lg-contact-box">
                <p><strong>Email:</strong> <a href="mailto:Customercare@salarytopup.com">Customercare@salarytopup.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+919355753533">+91 9355753533</a></p>
              </div>

              <p style={{marginTop:"24px", fontSize:"0.82rem", color:"#999"}}>By applying for a loan, you acknowledge that you have read and understood these Rate &amp; Terms.</p>
            </div>
          </main>

        </div>
      </div>
    </>
  );
};

export default RateandTerms;
