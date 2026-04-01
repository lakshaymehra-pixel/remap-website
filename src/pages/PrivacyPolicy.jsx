import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../css/legal.css";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Salary Top Up Loan Services</title>
        <meta property="og:title" content="Privacy Policy | Salary Top Up Loan Services" />
        <meta name="description" content="Learn how Salary Topup collects, uses, and protects your data. Read our privacy policy on salary info, cookies, data rights, security, and user consent." />
        <meta property="og:description" content="Learn how Salary Topup collects, uses, and protects your data. Read our privacy policy on salary info, cookies, data rights, security, and user consent." />
        <link rel="canonical" href="https://salarytopup.com/privacy-policy" />
      </Helmet>

      {/* ===== HERO ===== */}
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

          {/* ===== SIDEBAR ===== */}
          <aside className="lg-sidebar">
            <div className="lg-toc">
              <div className="lg-toc-title">On This Page</div>
              <ul>
                <li><a href="#collection">1. Information We Collect</a></li>
                <li><a href="#usage">2. How We Use It</a></li>
                <li><a href="#security">3. Data Security</a></li>
                <li><a href="#rights">4. Your Rights</a></li>
                <li><a href="#retention">5. Data Retention</a></li>
                <li><a href="#cookies">6. Cookies</a></li>
                <li><a href="#grievance">7. Grievance Officer</a></li>
                <li><a href="#changes">8. Policy Changes</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>
          </aside>

          {/* ===== CONTENT ===== */}
          <main className="lg-content">
            <div className="lg-card">
              <h2 className="lg-main-title">Our Privacy Commitment</h2>
              <p className="lg-subtitle">
                <strong>Baid Stock Broking Services Private Limited</strong> ("we," "our," "us") operates the salarytopup.com website. This Privacy Policy explains how we collect, use, and share your personal information when you use our Service.
              </p>

              <h2 id="collection"><span className="lg-sec-num">1</span> Information We Collect</h2>
              <ul>
                <li><strong>Personal Information:</strong> Name, address, email address, phone number, date of birth, and other identifying information collected when you apply for a loan or use our services.</li>
                <li><strong>Usage Information:</strong> IP addresses, browser type, and operating system — collected when you access and use our website.</li>
                <li><strong>Financial Information:</strong> Bank account details, credit history, and other financial data necessary for providing our services.</li>
                <li><strong>Identification Documents:</strong> Copies of government-issued identification documents such as Aadhaar card, PAN card, or passport.</li>
              </ul>

              <h2 id="usage"><span className="lg-sec-num">2</span> How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul>
                <li>To provide and maintain our services.</li>
                <li>To process your transactions and manage your accounts.</li>
                <li>To verify your identity and prevent fraud.</li>
              </ul>

              <h2 id="security"><span className="lg-sec-num">3</span> Data Security</h2>
              <p>We implement appropriate technical and organisational measures to protect your personal information from unauthorised access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

              <h2 id="rights"><span className="lg-sec-num">4</span> Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
              <ul>
                <li>The right to access your personal information.</li>
                <li>The right to correct any inaccurate or incomplete information.</li>
                <li>The right to request the deletion of your personal information.</li>
                <li>The right to object to or restrict the processing of your personal information.</li>
                <li>To exercise these rights, please contact us using the information provided below.</li>
              </ul>

              <h2 id="retention"><span className="lg-sec-num">5</span> Data Retention and Deletion</h2>
              <p>In accordance with our adopted document retention policy, we will keep records for internal use as required. You have the choice to consent to the use of certain data, limit its disclosure to third parties, control data retention, or revoke consent once your Credit Line is fully settled, subject to applicable regulations including the Prevention of Money-Laundering Act, 2002.</p>
              <ul>
                <li>You have a right to request the deletion of your personal information.</li>
              </ul>

              <h2 id="cookies"><span className="lg-sec-num">6</span> Cookies and Tracking Technologies</h2>
              <p>We use cookies and similar tracking technologies to enhance your experience on our website. You can control the use of cookies through your browser settings.</p>

              <h2 id="grievance"><span className="lg-sec-num">7</span> Grievance Officer</h2>
              <p>At Salary Topup, your privacy and satisfaction are our top priorities. We have appointed a dedicated Grievance Officer to ensure your concerns are addressed promptly. If you have any issues regarding your personal information or our services, please reach out.</p>

              <h2 id="changes"><span className="lg-sec-num">8</span> Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new Privacy Policy on our website with an updated date.</p>

              <h2 id="contact"><span className="lg-sec-num">✉</span> Contact Our Team</h2>
              <div className="lg-contact-box">
                <p><strong>Name:</strong> Customer Care</p>
                <p><strong>Phone:</strong> <a href="tel:+919355753533">+91 9355753533</a></p>
                <p><strong>Email:</strong> <a href="mailto:Customercare@salarytopup.com">Customercare@salarytopup.com</a></p>
                <p><strong>Address:</strong> Office No-101, First Floor, NN Mall, Mangalam Palace, Sector-3, Rohini, Delhi – 110085</p>
              </div>

              <p style={{marginTop:"24px", fontSize:"0.82rem", color:"#999"}}>We are committed to resolving your concerns in a timely and efficient manner. Thank you for choosing Salary Topup.</p>
            </div>
          </main>

        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
