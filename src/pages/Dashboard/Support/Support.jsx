import React, { useState } from "react";
import { BoxWrapper } from '../../../style';

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const errs = {};

    // Name: only letters
    if (!formData.name.trim()) {
      errs.name = "Full name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errs.name = "Name should only contain letters";
    }

    // Email: basic required
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    }

    // Phone: numeric
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phone)) {
      errs.phone = "Phone number must be numeric only";
    }

    // Subject: required
    if (!formData.subject) {
      errs.subject = "Please select an inquiry type";
    }

    // Message: not numeric only
    if (!formData.message.trim()) {
      errs.message = "Message is required";
    } else if (/^\d+$/.test(formData.message)) {
      errs.message = "Message cannot be numeric only";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      // Place API call or backend logic here
    }
  };

    return (
        <div>
            <BoxWrapper className="w100 gray">
                <div className="left"></div>
                <section className="contact-page" style={{backgroundImage:"none"}}>
                    <div className="container">
                        <div className="contact-wrapper fade-in">
                            {/* Contact info (unchanged) */}
                            <div className="contact-info">
                                <div className="section-header">
                                    <h1>Contact <span className="highlight">Salary Topup</span></h1>
                                    <p>Need help? We're here for you.</p>
                                </div>
                                <div className="contact-details">
                                    <div className="contact-method">
                                        <div className="contact-icon">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </div>
                                        <div className="contact-text">
                                            <h3>Our Address</h3>
                                            <p>Office No-101, First Floor,<br />NN Mall, Mangalam Palace,<br />Sector-3, Rohini Delhi-110085</p>
                                        </div>
                                    </div>
                                    <div className="contact-method">
                                        <div className="contact-icon">
                                            <i className="fas fa-phone"></i>
                                        </div>
                                        <div className="contact-text">
                                            <h3>Customer Support</h3>
                                            <p>+91 9355753533</p>
                                            <p>Monday - Saturday, 9 AM to 6 PM</p>
                                        </div>
                                    </div>
                                    <div className="contact-method">
                                        <div className="contact-icon">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <div className="contact-text">
                                            <h3>Email Support</h3>
                                            <p><a href="mailto:Customercare@salarytopup.com">Customercare@salarytopup.com</a></p>

                                        </div>
                                    </div>
                                </div>

                                <div className="contact-social">
                                    <h3>Get in Touch</h3>
                                    <div className="social-links">
                                        <a href="https://www.facebook.com/profile.php?id=61574094973748" className="social-link"><i className="fab fa-facebook-f"></i></a>
                                        <a href="https://x.com/SalaryTopup" className="social-link"><i className="fab fa-twitter"></i></a>
                                        <a href="https://www.instagram.com/salary_topup?igsh=MWF2Zzc5N3B2NDh1" className="social-link"><i className="fab fa-instagram"></i></a>
                                        <a href="https://www.linkedin.com/company/salary-topup/" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                                    </div>
                                </div>
                            </div>

                            {/* Contact form */}
                            <div className="contact-form-container">
                                <form onSubmit={handleSubmit} id="contact-form" className="contact-form">
                                    <h2>We're Here</h2>
                                    <p>We'd love to hear from you — send us a message.</p>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name <span className="required">*</span></label>
                                            <input type="text" id="name" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
                                            {errors.name && <small className="error">{errors.name}</small>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Email Address <span className="required">*</span></label>
                                            <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                                            {errors.email && <small className="error">{errors.email}</small>}
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                                            <input type="tel" id="phone" name="phone" placeholder="Enter your Phone No." value={formData.phone} onChange={handleChange} required />
                                            {errors.phone && <small className="error">{errors.phone}</small>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="subject">Inquiry Type <span className="required">*</span></label>
                                            <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required>
                                                <option value="">Select Inquiry Type</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="support">Customer Support</option>
                                                <option value="loan">Loan Assistance</option>
                                                <option value="feedback">Feedback</option>
                                            </select>
                                            {errors.subject && <small className="error">{errors.subject}</small>}
                                        </div>
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="message">Your Message <span className="required">*</span></label>
                                        <textarea name="message" rows="5" placeholder="Type your message here..." value={formData.message} onChange={handleChange} required />
                                        {errors.message && <small className="error">{errors.message}</small>}
                                    </div>

                                    <div className="form-group full-width">
                                        <button type="submit" className="btn btn-primary-contact">
                                            <i className="fas fa-paper-plane"></i> Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="hero-shape"></div>
                </section>
            </BoxWrapper>
        </div>
    )
}

export default Support;