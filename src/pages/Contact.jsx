import React, { useState, useEffect } from "react";
import "../css/contact.css";
import { Helmet } from "react-helmet";
import logo from "../images/logo.webp";

const DEFAULT_CONTACT = {
  address: 'B-76, 2nd Floor, Wazirpur Industrial Area, Delhi 110052',
  phone: '+91 9355753533',
  hours: 'Monday - Saturday, 9 AM to 7 PM',
  whatsapp1: '+91-9899001138',
  whatsapp2: '+91-8448240723',
  email: 'customercare@salarytopup.com',
};

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'https://backend-production-bf30.up.railway.app'}/api/pages/public/contact`)
      .then(r => r.json())
      .then(data => {
        if (data && data.content) {
          try {
            const parsed = JSON.parse(data.content);
            setContactInfo({ ...DEFAULT_CONTACT, ...parsed });
          } catch { }
        }
      })
      .catch(() => { });
  }, []);

  const [formData, setFormData] = useState({
    name: "", email: "", mobile: "", inquiryType: "", subject: "", message: "", consent: false,
  });
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const isFormReady = formData.consent && formData.name && formData.email && formData.mobile && formData.inquiryType && formData.message;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    else if (!/^[A-Za-z\s]+$/.test(formData.name)) errs.name = "Only letters allowed";
    if (!formData.email.trim()) errs.email = "Email is required";
    if (!formData.mobile.trim()) errs.mobile = "Mobile number is required";
    else if (!/^\d+$/.test(formData.mobile)) errs.mobile = "Only numbers allowed";
    if (!formData.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const sendMail = async () => {
      if (processing) return;
      setProcessing(true);
      try {
        const resp = await fetch(`${process.env.REACT_APP_API_URL || 'https://backend-production-bf30.up.railway.app'}/api/contacts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: formData.name, email: formData.email, mobile: formData.mobile, inquiryType: formData.inquiryType, message: formData.message }),
        });
        if (resp.ok) {
          alert("Form Submitted Successfully! We'll get back to you shortly.");
        } else { alert("Form Not submitted, please try again later!"); }
      } catch (error) { console.error("Error:", error); }
      finally { setProcessing(false); setFormData({ name: "", email: "", mobile: "", subject: "", message: "", consent: false }); }
    };
    sendMail();
  };

  return (
    <>
      <Helmet>
        <title>Contact Salary Top up - We're Here to Help You</title>
        <meta name="description" content="Have questions or need support? Contact Salary Top up via phone, email, or our inquiry form." />
        <link rel="canonical" href="https://salarytopup.com/contact" />
      </Helmet>

      <div className="ct-page">
        <div className="ct-body">
          <div className="ct-left">
            <h1>We're Here</h1>
            <p className="ct-sub">We'd love to hear from you — send us a message.</p>
            <form onSubmit={handleSubmit} className="ct-form">
              <div className="ct-row">
                <div className="ct-field">
                  <label>Full Name <span>*</span></label>
                  <input type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} />
                  {errors.name && <small className="ct-err">{errors.name}</small>}
                </div>
                <div className="ct-field">
                  <label>Email Address <span>*</span></label>
                  <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                  {errors.email && <small className="ct-err">{errors.email}</small>}
                </div>
              </div>
              <div className="ct-field ct-full">
                <label>Mobile Number <span>*</span></label>
                <input type="tel" name="mobile" maxLength="10" placeholder="Enter your Mobile No." value={formData.mobile} onChange={handleChange} />
                {errors.mobile && <small className="ct-err">{errors.mobile}</small>}
              </div>
              <div className="ct-field ct-full">
                <label>Inquiry Type <span>*</span></label>
                <select name="inquiryType" value={formData.inquiryType} onChange={handleChange}>
                  <option value="">Select Inquiry Type</option>
                  <option value="Loan Inquiry">Loan Inquiry</option>
                  <option value="Repayment">Repayment</option>
                  <option value="Account Issue">Account Issue</option>
                  <option value="KYC / Documents">KYC / Documents</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="ct-field ct-full">
                <label>Your Message <span>*</span></label>
                <textarea name="message" rows="4" placeholder="Type your message here..." value={formData.message} onChange={handleChange}></textarea>
                {errors.message && <small className="ct-err">{errors.message}</small>}
              </div>
              <div className="ct-field ct-full">
                <label className="ct-check">
                  <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} />
                  <span>I agree to be contacted by <strong>SalaryTopUp</strong> for alerts & promotions*</span>
                </label>
              </div>
              <button type="submit" disabled={!isFormReady} className={`ct-submit ${isFormReady ? "" : "ct-disabled"}`}>
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
            </form>
          </div>

          <div className="ct-right">
            <div className="ct-card ct-map-card">
              <div className="ct-map-left">
                <h3>Get in Touch</h3>
                <strong>We're Here</strong>
                <p>We'd love to hear from you — send us a message.</p>
                <a href="https://maps.app.goo.gl/knAsn3zigTZn8u3x5" target="_blank" rel="noopener noreferrer" className="ct-map-btn">
                  <i className="fas fa-map-marker-alt"></i> View on Google Maps
                </a>
              </div>
              <div className="ct-map-right">
                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5!2d77.16!3d28.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQyJzAwLjAiTiA3N8KwMDknMzYuMCJF!5e0!3m2!1sen!2sin!4v1" width="100%" height="100%" style={{border:0,borderRadius:"12px"}} allowFullScreen="" loading="lazy"></iframe>
              </div>
            </div>

            <div className="ct-card">
              <h3>Get in Touch</h3>
              <div className="ct-info-grid">
                <div className="ct-info-col">
                  <div className="ct-info-item">
                    <i className="fas fa-map-marker-alt ct-ii"></i>
                    <div><strong>Our Address</strong><p>{contactInfo.address}</p></div>
                  </div>
                  <div className="ct-info-item">
                    <i className="fab fa-whatsapp ct-ii"></i>
                    <div><strong>WhatsApp us</strong><p>{contactInfo.whatsapp1}<br/>{contactInfo.whatsapp2}</p></div>
                  </div>
                </div>
                <div className="ct-info-col">
                  <div className="ct-info-item">
                    <i className="fas fa-phone ct-ii"></i>
                    <div><strong>Customer Support</strong><p>{contactInfo.phone}<br/>{contactInfo.hours}</p></div>
                  </div>
                  <div className="ct-info-item">
                    <i className="fas fa-envelope ct-ii"></i>
                    <div><strong>Email Support</strong><p>{contactInfo.email}</p></div>
                  </div>
                </div>
              </div>
              <div className="ct-social">
                <span>Follow us</span>
                <a href="https://www.facebook.com/profile.php?id=61574094973748" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://x.com/SalaryTopup" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width:"14px",height:"14px"}}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="https://www.instagram.com/salary_topup" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/company/salary-topup/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;