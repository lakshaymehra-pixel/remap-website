import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "../css/legal.css";

const PrivacyPolicy = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'https://backend-production-bf30.up.railway.app'}/api/pages/public/privacy-policy`)
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
              {loading ? (
                <p style={{ color: '#94a3b8' }}>Loading...</p>
              ) : content ? (
                <div className="lg-cms-content" dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <>
                  <p><strong>Baid Stock Broking Services Private Limited</strong> ("we," "our," "us") operates the https://www.salarytopup.com website (the "Service"). This Privacy Policy explains how we collect, use, and share your personal information when you use our Service.</p>

                  <h2>Information We Collection</h2>
                  <p><strong>Personal Information:</strong> When you apply for a loan or use our Services, we may collect personal information such as your Name, address, email address, phone number, date of birth, and other identifying information.</p>
                  <p><strong>Usage Information:</strong> We may collect information about how you access and use our website and services, including IP addresses, browser type, and operating system.</p>
                  <p><strong>Financial Information:</strong> Bank account details, credit card information, credit history, and other financial data necessary for providing our services.</p>
                  <p><strong>Identification Documents:</strong> Copies of government-issued identification documents, such as passports or driver's licenses.</p>

                  <h2>How We Use Your Information</h2>
                  <p>We use your information for the following purposes:</p>
                  <ul>
                    <li>To provide and maintain our services.</li>
                    <li>To process your transactions and manage your accounts.</li>
                    <li>To verify your identity and prevent fraud.</li>
                  </ul>

                  <h2>Data Security</h2>
                  <p>We implement appropriate technical and organisational measures to protect your personal information from unauthorised access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

                  <h2>Your Rights</h2>
                  <p>Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
                  <ul>
                    <li>The right to access your personal information.</li>
                    <li>The right to correct any inaccurate or incomplete information.</li>
                    <li>The right to request the deletion of your personal information.</li>
                    <li>The right to object to or restrict the processing of your personal information.</li>
                  </ul>
                  <p>To exercise these rights, please contact us using the information provided below.</p>

                  <h2>Data Retention and Deletion</h2>
                  <p>You also attest to the fact that, in accordance with our adopted document retention policy, we will be free to keep such papers for internal records.</p>
                  <p>You have the choice to consent to the use of certain data, limit its disclosure to third parties, control data retention, or revoke consent that has already been given to collect personal data if the Credit Line you were given is settled and you owe them nothing more, and you obtain specific regulatory authority in accordance with the Prevention of Money-Laundering Act, 2002.</p>
                  <p>Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
                  <ul>
                    <li>You have a right to request the deletion of your personal information.</li>
                  </ul>

                  <h2>Cookies and Tracking Technologies</h2>
                  <p>We use cookies and similar tracking technologies to enhance your experience on our website. You can control the use of cookies through your browser settings.</p>

                  <h2>Grievance Officer</h2>
                  <p>At Salary Topup, your privacy and satisfaction are our top priorities. To ensure your concerns are addressed promptly, we have appointed a dedicated Grievance Officer. If you have any issues or grievances regarding your personal information or our services, please do not hesitate to reach out.</p>

                  <h2>Contact Our Team</h2>
                  <p><strong>Customer Care</strong></p>
                  <p><strong>Phone:</strong> +91 9355753533</p>
                  <p><strong>Email:</strong> Customercare@salarytopup.com</p>
                  <p><strong>Address:</strong> B-76, 2nd Floor, Wazirpur Industrial Area, Delhi – 110052</p>
                  <p>We are committed to resolving your concerns in a timely and efficient manner. Thank you for choosing Salary Topup.</p>

                  <h2>Changes to this Privacy Policy</h2>
                  <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new Privacy Policy on our website.</p>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
