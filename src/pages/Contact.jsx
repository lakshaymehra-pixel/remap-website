import React, { useState } from "react";
import "../css/contact.css";
import { Helmet } from "react-helmet";
import logo from "../images/logo.webp";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", mobile: "", subject: "", message: "", consent: false,
  });
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const isFormReady = formData.consent && formData.name && formData.email && formData.mobile && formData.message;

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
        const resp = await fetch("https://salarytopup.in/api/SendCustomerQuery", {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify({ name: formData.name, email: formData.email, mobile: formData.mobile, subject: formData.subject, message: formData.message }),
        });
        if (resp.status === 200) {
          const dataset = await resp.json();
          if (dataset.status === 1) alert("Form Submitted Successfully");
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
                    <div><strong>Our Address</strong><p>B-76, 2nd Floor,<br/>Wazirpur Industrial Area,<br/>Delhi 110052</p></div>
                  </div>
                  <div className="ct-info-item">
                    <i className="fab fa-whatsapp ct-ii"></i>
                    <div><strong>WhatsApp us</strong><p>+91-9899001138<br/>+91-8448240723</p></div>
                  </div>
                </div>
                <div className="ct-info-col">
                  <div className="ct-info-item">
                    <i className="fas fa-phone ct-ii"></i>
                    <div><strong>Customer Support</strong><p>+91 9355753533<br/>Monday - Saturday,<br/>9 AM to 7 PM</p></div>
                  </div>
                  <div className="ct-info-item">
                    <i className="fas fa-envelope ct-ii"></i>
                    <div><strong>Email Support</strong><p>customercare@salarytopup.com</p></div>
                  </div>
                </div>
              </div>
              <div className="ct-social">
                <span>Follow us</span>
                <a href="https://www.facebook.com/profile.php?id=61574094973748" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://x.com/SalaryTopup" target="_blank" rel="noopener noreferrer"><span style={{fontWeight:800, fontSize:"0.8rem"}}>X</span></a>
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