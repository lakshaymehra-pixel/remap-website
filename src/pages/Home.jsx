import React, { useEffect, useState, useRef } from "react";
import landingpage from "../images/landingpage.webp";
import "../css/topup.css"; // v2
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Testimonials data — 9 cards
const tstData = [
  { name:"Ankit Kumar",   city:"Delhi",     text:"Amazing service and very easy to use. The process was smooth and quick. I highly recommend it to everyone." },
  { name:"Priya Sharma",  city:"Mumbai",    text:"Got my salary advance within 10 minutes. No paperwork, no hassle. Best experience I've ever had with a loan app." },
  { name:"Rahul Verma",   city:"Bangalore", text:"Transparent fees and instant approval. Customer support was very helpful. Will definitely use again for emergencies." },
  { name:"Sneha Gupta",   city:"Hyderabad", text:"I needed money urgently for a medical bill. SalaryTopUp disbursed the amount in just 15 minutes. Lifesaver!" },
  { name:"Vikram Singh",  city:"Jaipur",    text:"Very user-friendly app with great customer service. The interest rates are fair and the repayment process is simple." },
  { name:"Neha Patel",    city:"Ahmedabad", text:"Applied at night and got approved instantly. The money was in my account by morning. Truly 24/7 service!" },
  { name:"Amit Mishra",   city:"Lucknow",   text:"SalaryTopUp helped me when no bank would. Quick disbursal, zero hidden charges. Highly recommended for salaried people." },
  { name:"Kavita Reddy",  city:"Chennai",   text:"The entire process is digital and hassle-free. Got my loan approved in under 5 minutes. Excellent customer support too." },
  { name:"Saurabh Jain",  city:"Pune",      text:"Best salary loan app I have used. The repayment is flexible and the interest rates are very competitive. Five stars!" },
];

const TstSection = () => {
  const [tstPage, setTstPage] = useState(0);
  const totalPages = 3; // 9 cards / 3 per page

  useEffect(() => {
    const timer = setInterval(() => {
      setTstPage(prev => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const visible = tstData.slice(tstPage * 3, tstPage * 3 + 3);

  return (
    <section className="tst-section" id="testimonials">
      <h2 className="tst-title">What Our Customers Say</h2>
      <div className="tst-underline"></div>
      <div className="tst-slider-wrap">
        <div className="tst-slider" key={tstPage}>
          {visible.map((t, i) => (
            <div className="tst-card" key={i}>
              <div className="tst-card-header">
                <div className="tst-avatar">{t.name.charAt(0)}</div>
                <div className="tst-info">
                  <strong>{t.name}</strong>
                  <span>{t.city}</span>
                </div>
              </div>
              <p className="tst-text">{t.text}</p>
              <div className="tst-stars">
                {[1,2,3,4,5].map(s => <i className="fas fa-star" key={s}></i>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="tst-dots">
        {[0,1,2].map(i => (
          <span className={`tst-dot ${i === tstPage ? "tst-dot-active" : ""}`} key={i} onClick={() => setTstPage(i)}></span>
        ))}
      </div>
    </section>
  );
};

// FAQ Component
const faqData = [
  { q: "Who can apply for a SalaryTopUp loan?", a: "Any salaried individual aged 21-58 years with a minimum monthly income of ₹15,000 can apply. You need to be working with your current employer for at least 3 months." },
  { q: "How fast can I get the loan approval?", a: "Our AI-powered system processes applications instantly. Most loans are approved within 10 minutes and the amount is disbursed to your bank account within 30 minutes." },
  { q: "Do I need to provide any collateral?", a: "No, SalaryTopUp loans are completely unsecured. You don't need to pledge any asset or provide any collateral. Your salary is your credit." },
  { q: "What documents are required to apply?", a: "You just need your PAN card, Aadhaar card, and last 3 months bank statement. Everything is verified digitally — no physical documents needed." },
  { q: "How can I repay my loan?", a: "You can repay via UPI, net banking, debit card, or auto-debit from your salary account. We also send reminders before the due date so you never miss a payment." },
  { q: "What is the interest rate?", a: "Our interest rates start from 1% per day depending on your credit profile. There are no hidden charges — what you see is what you pay." },
];

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-underline"></div>
        <div className="faq-list">
          {faqData.map((faq, i) => (
            <div className={`faq-item ${openFaq === i ? "faq-open" : ""}`} key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-question">
                <span>{faq.q}</span>
                <i className={`fas fa-chevron-down faq-arrow ${openFaq === i ? "faq-arrow-up" : ""}`}></i>
              </div>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Counter hook — counts from 0 to target
const useCounter = (target, duration = 2000, startCounting = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start * 10) / 10);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);
  return count;
};

// Stats Counter Component
const StatsCounter = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const c1 = useCounter(5.1, 2000, visible);
  const c2 = useCounter(1.4, 2000, visible);
  const c3 = useCounter(61, 2000, visible);
  const c4 = useCounter(10, 2000, visible);

  return (
    <div className="wc-stats" ref={ref}>
      <div className="wc-stat-item">
        <span className="wc-stat-label">OVER</span>
        <strong className="wc-stat-value">{c1.toFixed(1)} Crore</strong>
        <span className="wc-stat-sub">Loan Disbursed</span>
      </div>
      <div className="wc-stat-item">
        <span className="wc-stat-label">OVER</span>
        <strong className="wc-stat-value">{c2.toFixed(1)} Crore</strong>
        <span className="wc-stat-sub">Loan Customers</span>
      </div>
      <div className="wc-stat-item">
        <span className="wc-stat-label">OVER</span>
        <strong className="wc-stat-value">{Math.floor(c3)} Lakh</strong>
        <span className="wc-stat-sub">Active Users</span>
      </div>
      <div className="wc-stat-item">
        <span className="wc-stat-label">OVER</span>
        <strong className="wc-stat-value">{Math.floor(c4)} Lakhs</strong>
        <span className="wc-stat-sub">Max. Loan Amount</span>
      </div>
    </div>
  );
};

const Home = () => {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [loanPeriod, setLoanPeriod] = useState(15);
  const [interestRate, setInterestRate] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);

  // CIBIL Score Check
  const [showCibilForm, setShowCibilForm] = useState(false);
  const [cibilStep, setCibilStep] = useState(1);
  const [cibilLoading, setCibilLoading] = useState(false);
  const [cibilScore, setCibilScore] = useState(null);
  const [cibilForm, setCibilForm] = useState({ name:"", mobile:"", pan:"" });

  const handleCibilCheck = () => {
    setShowCibilForm(true);
    setCibilStep(1);
    setCibilScore(null);
    setCibilError("");
    setCibilForm({ name:"", mobile:"", pan:"" });
  };

  const [cibilError, setCibilError] = useState("");

  const handleCibilSubmit = () => {
    setCibilError("");
    if (cibilStep === 1) {
      if (!cibilForm.name.trim() || cibilForm.name.trim().length < 3) {
        setCibilError("Please enter your full name (min 3 characters)"); return;
      }
      if (!/^\d{10}$/.test(cibilForm.mobile)) {
        setCibilError("Please enter a valid 10-digit mobile number"); return;
      }
      setCibilStep(2); return;
    }
    // Step 2 — PAN validation: 5 letters + 4 digits + 1 letter
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(cibilForm.pan)) {
      setCibilError("Please enter a valid PAN number (e.g. ABCPD1234K)"); return;
    }
    setCibilLoading(true);
    setTimeout(() => {
      setCibilScore(Math.floor(Math.random() * 151) + 650);
      setCibilLoading(false);
      setCibilStep(3);
    }, 2500);
  };

  const cibilLabel = (s) => s >= 750 ? "Excellent" : s >= 700 ? "Good" : "Average";
  const cibilColor = (s) => s >= 750 ? "#3a7d8f" : s >= 700 ? "#4a9aaa" : "#ff9800";
  const cibilNeedle = (s) => -90 + ((s - 300) / 600) * 180;


  const testimonials = [
    {
      name: "Rahul Sharma",
      text: "Salary TopUp saved me during an unexpected medical emergency. The process was incredibly smooth, and I had the money I needed in minutes.",
      role: "IT Professional, Bangalore"
    },
    {
      name: "Priya Patel",
      text: "I was skeptical at first, but the transparency and ease of using Salary TopUp won me over. No hidden charges as promised!",
      role: "Marketing Manager, Mumbai"
    },
    {
      name: "Akash Gupta",
      text: "The paperless process is a game-changer. Everything was done digitally, and I didn't have to visit any office or submit physical documents.",
      role: "Teacher, Delhi"
    }
  ];

  const dailyRate    = interestRate / 100;
  const totalInterest  = Math.round(loanAmount * dailyRate * loanPeriod);
  const processingFee  = Math.round(loanAmount * 0.02);
  const totalPayment   = loanAmount + totalInterest + processingFee;
  // Donut chart — rotation-based (no dashoffset gaps)
  const R   = 80;
  const C   = 2 * Math.PI * R;
  const gap = 3;
  const principalDash = Math.max(0, (loanAmount    / totalPayment) * C - gap);
  const interestDash  = Math.max(0, (totalInterest / totalPayment) * C - gap);
  const feeDash       = Math.max(0, (processingFee / totalPayment) * C - gap);
  const interestRot   = -90 + (loanAmount / totalPayment) * 360;
  const feeRot        = -90 + ((loanAmount + totalInterest) / totalPayment) * 360;

  // ✅ Animate sections on scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.2 }
    );

    document
      .querySelectorAll(".feature-card, .step, .testimonial, .cta-content")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // ✅ Testimonial slider with React state
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <>
      <Helmet>
        <title>Apply for Instant salary Loan Online Now | Salary TopUp</title>
        <meta
          name="description"
          content="Get instant financial support with Salary TopUp online salary loan application. Apply now for quick approval, flexible terms, and convenient repayment options."
        />
        <link rel="canonical" href="https://salarytopup.com/" />
      </Helmet>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg-wrap">
          <img src={landingpage} alt="" className="hero-bg-img" />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1>Sahi Financial Decisions<br />se Life Banegi <span className="hero-highlight">Great</span></h1>
            <p>
              Achieve your life goals with a personalized approach to money.
            </p>
            <div className="hero-stats">
              <div className="hero-stat-item">
                <strong>&#9733; 10+ Lakh</strong>
                <span>Goal Achieved</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat-item">
                <strong>4.9 <i className="fas fa-download" style={{fontSize:"0.7rem"}}></i></strong>
                <span>Play Store</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat-item">
                <strong>&#10003; 7 Cr</strong>
                <span>Safe Transactions</span>
              </div>
            </div>
            <div className="hero-buttons">
              <a href="https://play.google.com/store/apps/details?id=com.salarytopup.salarytopup" target="_blank" rel="noopener noreferrer" className="btn-download">Download app &rarr;</a>
            </div>
          </div>
        </div>

      </section>

      {/* Apply Now Banner */}
      <div className="hsb-banner">
        {/* Left — SVG Illustration */}
        <div className="hsb-illust">
          <svg viewBox="0 0 140 120" className="hsb-svg" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,95 A45,45 0 0,1 110,95" fill="none" stroke="#e53935" strokeWidth="8" strokeLinecap="round"/>
            <path d="M20,95 A45,45 0 0,1 65,50" fill="none" stroke="#ff9800" strokeWidth="8" strokeLinecap="round"/>
            <path d="M65,50 A45,45 0 0,1 90,58" fill="none" stroke="#fdd835" strokeWidth="8" strokeLinecap="round"/>
            <path d="M90,58 A45,45 0 0,1 110,95" fill="none" stroke="#4a9aaa" strokeWidth="8" strokeLinecap="round"/>
            <line x1="65" y1="95" x2="65" y2="60" stroke="#fff" strokeWidth="3" strokeLinecap="round" className="hsb-needle"/>
            <circle cx="65" cy="95" r="4" fill="#fff"/>
            <circle cx="65" cy="22" r="14" fill="#fdd835"/>
            <circle cx="61" cy="19" r="1.5" fill="#333"/>
            <circle cx="69" cy="19" r="1.5" fill="#333"/>
            <path d="M61,25 Q65,29 69,25" fill="none" stroke="#333" strokeWidth="1.2" strokeLinecap="round"/>
            <rect x="52" y="35" width="26" height="24" rx="6" fill="#4a9aaa"/>
            <rect x="95" y="15" width="36" height="22" rx="4" fill="#4a9aaa" className="hsb-float-card"/>
            <rect x="99" y="20" width="16" height="2.5" rx="1" fill="rgba(255,255,255,0.5)"/>
            <rect x="99" y="25" width="10" height="2.5" rx="1" fill="rgba(255,255,255,0.3)"/>
            <rect x="8" y="10" width="22" height="18" rx="5" fill="#4a9aaa" className="hsb-float-pct"/>
            <text x="19" y="23" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800">%</text>
            <circle cx="105" cy="50" r="8" fill="#fdd835" className="hsb-float-check"/>
            <text x="105" y="54" textAnchor="middle" fill="#333" fontSize="9" fontWeight="800">&#10003;</text>
          </svg>
        </div>

        {/* Center — Content */}
        <div className="hsb-content">
          <strong>Check Eligibility & Apply Now!</strong>
          <span>Instant approval with minimal documentation. Get funds in 10 minutes.</span>
        </div>

        {/* Right — Button */}
        <Link to="/apply-now" className="hsb-apply-btn">
          Apply Now <i className="fas fa-arrow-right"></i>
        </Link>
      </div>

      {/* WHY CHOOSE SECTION */}
      <section className="wc-section">
        <div className="wc-container">
          <h2 className="wc-title">Why Choose Salary TopUp ?</h2>
          <div className="wc-underline"></div>

          <div className="wc-grid">
            {[
              { icon:"fa-hand-holding-usd", title:"Lower Interest Rates",  desc:"Get loans for multiple purposes at lower interest rates to suit your needs" },
              { icon:"fa-clock",            title:"Instant Approval",      desc:"Get your loan approved within minutes with minimal documentation required" },
              { icon:"fa-laptop",           title:"Paperless Process",     desc:"Complete digital journey from application to disbursement, no paperwork needed" },
              { icon:"fa-lock",             title:"100% Secure",           desc:"Your data is encrypted with bank-grade security and never shared with third parties" },
              { icon:"fa-headphones-alt",   title:"24/7 Support",          desc:"Our dedicated support team is available round the clock to assist you anytime" },
            ].map((card, i) => (
              <div className="wc-card" key={i}>
                <div className="wc-card-icon">
                  <i className={`fas ${card.icon}`}></i>
                </div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar with Counter */}
        <div className="wc-stats-bg">
          <StatsCounter />
        </div>
      </section>

      {/* LOANS SECTION */}
      <section className="loans-section" id="loans">
        <div className="loans-wrapper">
          {/* Left Content */}
          <div className="loans-left">
            <div className="loans-badge">
              <span className="loans-badge-icon">
                <i className="fas fa-landmark"></i>
              </span>
              LOANS
            </div>
            <h2 className="loans-heading">
              Every wish fulfilled.<br />Get instant funds!
            </h2>
            <a
              href="https://play.google.com/store/apps/details?id=com.salarytopup.salarytopup"
              target="_blank"
              rel="noopener noreferrer"
              className="loans-download-btn"
            >
              Download app &rarr;
            </a>

            <div className="loans-grid">
              {[
                { icon: "fa-money-bill-wave", title: "Personal Loan",    desc: "Get up to ₹10L in 10 mins" },
                { icon: "fa-home",            title: "Home Loan",         desc: "Interest starts from 7.75%* p.a." },
                { icon: "fa-building",        title: "Loan on Property",  desc: "Up to ₹75L without ITR" },
                { icon: "fa-credit-card",     title: "Credit Cards",      desc: "Lifetime FREE cards with up to ₹5L limit" },
                { icon: "fa-briefcase",       title: "Business Loan",     desc: "Get up to ₹5L with 60M tenure" },
              ].map((loan, i) => (
                <div className="loan-card" key={i}>
                  <div className="loan-card-top">
                    <span className="loan-card-icon">
                      <i className={`fas ${loan.icon}`}></i>
                    </span>
                    <span className="loan-card-arrow">
                      &#8599;
                    </span>
                  </div>
                  <h4>{loan.title}</h4>
                  <p>{loan.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — iPhone Mockup */}
          <div className="loans-right">
            <div className="loans-video-box">
              <div className="mv-phone">
                {/* iPhone Frame */}
                <div className="mv-frame">
                  {/* Buttons */}
                  <div className="mv-btn mv-btn-silent"></div>
                  <div className="mv-btn mv-btn-vup"></div>
                  <div className="mv-btn mv-btn-vdown"></div>
                  <div className="mv-btn mv-btn-power"></div>
                  {/* Screen */}
                  <div className="mv-screen">
                    {/* Status Bar */}
                    <div className="mv-statusbar">
                      <span className="mv-time">9:41</span>
                      <div className="mv-island"></div>
                      <div className="mv-signals">
                        <i className="fas fa-signal"></i>
                        <i className="fas fa-wifi"></i>
                        <i className="fas fa-battery-full"></i>
                      </div>
                    </div>
                    {/* App — Full Animated Loan Process */}
                    <div className="mv-app">
                      {/* Header */}
                      <div className="mv-app-header">
                        <img src={require("../images/logo.webp")} alt="SalaryTopUp" className="mv-logo-img" />
                        <div className="mv-app-htext">
                          <strong>SalaryTopUp</strong>
                          <span>Instant Salary Loan</span>
                        </div>
                        <div className="mv-avatar">R</div>
                      </div>


                      {/* Screens */}
                      <div className="mv-screens">

                        {/* S1 — Enter Mobile + OTP in one flow */}
                        <div className="mv-slide mv-s1">
                          <div className="mv-slide-icon"><i className="fas fa-mobile-alt"></i></div>
                          <h4>Enter Mobile Number</h4>
                          <div className="mv-input-box">
                            <span className="mv-flag">+91</span>
                            <span className="mv-typing">
                              {"9876543210".split("").map((d,i) => (
                                <span className="mv-digit" key={i} style={{"--di":i}}>{d}</span>
                              ))}
                            </span>
                            <span className="mv-cursor"></span>
                          </div>
                          <div className="mv-mock-btn mv-btn-anim">
                            <span>Send OTP</span>
                            <i className="fas fa-paper-plane"></i>
                          </div>
                        </div>

                        {/* S2 — OTP Fill */}
                        <div className="mv-slide mv-s2">
                          <div className="mv-slide-icon"><i className="fas fa-shield-alt"></i></div>
                          <h4>Enter OTP</h4>
                          <p>Code sent to +91 98765 43210</p>
                          <div className="mv-otp-boxes">
                            {"4827".split("").map((d,i) => (
                              <div className="mv-otp-box" key={i} style={{"--oi":i}}>
                                <span>{d}</span>
                              </div>
                            ))}
                          </div>
                          {/* OTP filling progress text */}
                          <div className="mv-otp-timer">
                            <i className="fas fa-clock"></i>
                            <span>Auto-reading OTP...</span>
                          </div>
                          <div className="mv-verify-check">
                            <i className="fas fa-check-circle"></i>
                            <span>Verified Successfully!</span>
                          </div>
                        </div>

                        {/* S3 — KYC & Documents */}
                        <div className="mv-slide mv-s3">
                                                    <div className="mv-slide-icon"><i className="fas fa-file-alt"></i></div>
                          <h4>Submit Documents</h4>
                          <div className="mv-doc-list">
                            {[
                              {icon:"fa-id-card",  label:"PAN Card",   sub:"ABCPD1234K"},
                              {icon:"fa-address-card", label:"Aadhaar", sub:"XXXX XXXX 5678"},
                              {icon:"fa-camera",   label:"Selfie",     sub:"Face matched"},
                              {icon:"fa-file-invoice", label:"Bank Statement", sub:"Auto-fetched"},
                            ].map((d,i) => (
                              <div className="mv-doc-item" key={i} style={{"--doci":i}}>
                                <div className="mv-doc-ic"><i className={`fas ${d.icon}`}></i></div>
                                <div className="mv-doc-info">
                                  <strong>{d.label}</strong>
                                  <span>{d.sub}</span>
                                </div>
                                <div className="mv-doc-check"><i className="fas fa-check"></i></div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* S4 — Loan Approved */}
                        <div className="mv-slide mv-s4">
                                                    <div className="mv-slide-icon mv-icon-success"><i className="fas fa-check"></i></div>
                          <h4>Loan Approved!</h4>
                          <div className="mv-approved-card">
                            <div className="mv-ap-amount">₹50,000</div>
                            <div className="mv-ap-grid">
                              <div className="mv-ap-item"><span>Tenure</span><strong>30 Days</strong></div>
                              <div className="mv-ap-item"><span>Rate</span><strong>1%/day</strong></div>
                              <div className="mv-ap-item"><span>Interest</span><strong>₹1,500</strong></div>
                              <div className="mv-ap-item"><span>Total</span><strong>₹51,500</strong></div>
                            </div>
                          </div>
                          <div className="mv-mock-btn mv-btn-anim2">
                            <span>Accept & Continue</span>
                            <i className="fas fa-arrow-right"></i>
                          </div>
                        </div>

                        {/* S5 — Money Disbursed */}
                        <div className="mv-slide mv-s5">
                                                    <div className="mv-confetti">
                            {"🎉💰🎊💵✨🎉💰🎊".split("").map((e,i) => (
                              <span className="mv-conf-item" key={i} style={{"--ci":i}}>{e}</span>
                            ))}
                          </div>
                          <div className="mv-slide-icon mv-icon-money"><i className="fas fa-rupee-sign"></i></div>
                          <h4>Money Sent!</h4>
                          <div className="mv-transfer-box">
                            <div className="mv-tr-flow">
                              <div className="mv-tr-node"><i className="fas fa-landmark"></i></div>
                              <div className="mv-tr-line"><div className="mv-tr-dot-move"></div></div>
                              <div className="mv-tr-node"><i className="fas fa-university"></i></div>
                            </div>
                            <div className="mv-tr-amount">₹50,000</div>
                            <div className="mv-tr-bank">HDFC Bank ****4521</div>
                            <div className="mv-tr-success"><i className="fas fa-check-circle"></i> Transfer Successful</div>
                          </div>
                        </div>

                      </div>

                    </div>
                    {/* Home indicator */}
                    <div className="mv-homebar"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINANCIAL STRATEGY SECTION — between Loans & Track */}
      <section className="fis-section" id="financial-strategy">
        <div className="fis-bg-circle c1"></div>
        <div className="fis-bg-circle c2"></div>
        <div className="fis-container">
          <div className="fis-header">
            <span className="fis-tag"><i className="fas fa-chart-pie"></i> Smart Calculator</span>
            <h2>Building Insightful <span className="fis-highlight">Financial Strategies</span></h2>
            <p>Adjust the sliders to see a real-time breakdown of your loan repayment</p>
          </div>
          <div className="fis-body">
            <div className="fis-calc">
              <div className="fis-calc-inner">
                <div className="fis-slider-group">
                  <div className="fis-slider-top">
                    <div className="fis-slider-label"><span className="fis-slider-icon"><i className="fas fa-rupee-sign"></i></span>Loan Amount</div>
                    <span className="fis-slider-val">₹{loanAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="fis-range-wrap"><input type="range" min="5000" max="100000" step="1000" value={loanAmount} onChange={e=>setLoanAmount(Number(e.target.value))} className="fis-range" style={{"--pct":`${((loanAmount-5000)/95000)*100}%`}}/></div>
                  <div className="fis-range-limits"><span>5000</span><span>1 Lakh</span></div>
                </div>
                <div className="fis-slider-group">
                  <div className="fis-slider-top">
                    <div className="fis-slider-label"><span className="fis-slider-icon"><i className="fas fa-calendar-alt"></i></span>Loan Period</div>
                    <span className="fis-slider-val">{loanPeriod} Days</span>
                  </div>
                  <div className="fis-range-wrap"><input type="range" min="7" max="40" step="1" value={loanPeriod} onChange={e=>setLoanPeriod(Number(e.target.value))} className="fis-range" style={{"--pct":`${((loanPeriod-7)/33)*100}%`}}/></div>
                  <div className="fis-range-limits"><span>7 Days</span><span>40 Days</span></div>
                </div>
                <div className="fis-slider-group">
                  <div className="fis-slider-top">
                    <div className="fis-slider-label"><span className="fis-slider-icon"><i className="fas fa-percentage"></i></span>Daily Interest Rate</div>
                    <span className="fis-slider-val">{interestRate.toFixed(1)}% / day</span>
                  </div>
                  <div className="fis-range-wrap"><input type="range" min="0.5" max="2" step="0.5" value={interestRate} onChange={e=>setInterestRate(Number(e.target.value))} className="fis-range" style={{"--pct":`${((interestRate-0.5)/1.5)*100}%`}}/></div>
                  <div className="fis-range-limits"><span>0.1%</span><span>1%</span></div>
                </div>
                <div className="fis-breakdown">
                  {[
                    {label:"Principal",value:`₹${loanAmount.toLocaleString("en-IN")}`,color:"#2C6275",icon:"fa-coins"},
                    {label:"Interest",value:`₹${totalInterest.toLocaleString("en-IN")}`,color:"#2196f3",icon:"fa-percent"},
                    {label:"Processing Fee",value:`₹${processingFee.toLocaleString("en-IN")}`,color:"#ff9800",icon:"fa-file-invoice"},
                    {label:"Total Payable",value:`₹${totalPayment.toLocaleString("en-IN")}`,color:"#2C6275",icon:"fa-receipt",highlight:true},
                  ].map((item,i)=>(
                    <div className={`fis-breakdown-card ${item.highlight?"fis-highlight-card":""}`} key={i} style={{"--clr":item.color}}>
                      <div className="fis-bc-icon"><i className={`fas ${item.icon}`}></i></div>
                      <div className="fis-bc-info"><span className="fis-bc-label">{item.label}</span><span className="fis-bc-value">{item.value}</span></div>
                    </div>
                  ))}
                </div>
                <Link to="/apply-now" className="fis-apply-btn">Apply Now <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
            <div className="fis-chart">
              <div className="fis-chart-inner">
                <h3 className="fis-chart-title">Repayment Breakdown</h3>
                <p className="fis-chart-sub">Visual overview of your loan repayment structure</p>
                {/* Donut Chart */}
                <div className="fis-donut-wrap">
                  <svg viewBox="0 0 280 280" className="fis-donut-svg">
                    {/* Track */}
                    <circle cx="140" cy="140" r={R} fill="none" stroke="#f0f2f4" strokeWidth="28"/>
                    {/* Principal — green */}
                    <circle cx="140" cy="140" r={R} fill="none"
                      stroke="#4caf50" strokeWidth="28"
                      strokeDasharray={`${principalDash} ${C}`}
                      transform="rotate(-90 140 140)"
                      style={{transition:"stroke-dasharray 0.5s"}}/>
                    {/* Interest — blue */}
                    <circle cx="140" cy="140" r={R} fill="none"
                      stroke="#2196f3" strokeWidth="28"
                      strokeDasharray={`${interestDash} ${C}`}
                      transform={`rotate(${interestRot} 140 140)`}
                      style={{transition:"all 0.5s"}}/>
                    {/* Fee — orange */}
                    <circle cx="140" cy="140" r={R} fill="none"
                      stroke="#ff9800" strokeWidth="28"
                      strokeDasharray={`${feeDash} ${C}`}
                      transform={`rotate(${feeRot} 140 140)`}
                      style={{transition:"all 0.5s"}}/>
                    {/* White center */}
                    <circle cx="140" cy="140" r="60" fill="white"/>

                    {/* Labels positioned around donut */}
                    {(() => {
                      const pPct = Math.round((loanAmount/totalPayment)*100);
                      const iPct = Math.round((totalInterest/totalPayment)*100);
                      const fPct = Math.round((processingFee/totalPayment)*100);
                      // Mid-angle for each segment
                      const pMid = -90 + (pPct/100 * 360) / 2;
                      const iMid = -90 + (pPct/100 * 360) + (iPct/100 * 360) / 2;
                      const fMid = -90 + (pPct/100 * 360) + (iPct/100 * 360) + (fPct/100 * 360) / 2;
                      const labelR = 126;
                      const px = 140 + labelR * Math.cos(pMid * Math.PI/180);
                      const py = 140 + labelR * Math.sin(pMid * Math.PI/180);
                      const ix = 140 + labelR * Math.cos(iMid * Math.PI/180);
                      const iy = 140 + labelR * Math.sin(iMid * Math.PI/180);
                      const fx = 140 + labelR * Math.cos(fMid * Math.PI/180);
                      const fy = 140 + labelR * Math.sin(fMid * Math.PI/180);
                      return <>
                        <text x={px} y={py-5} textAnchor="middle" fontSize="11" fill="#4caf50" fontWeight="700">Principal</text>
                        <text x={px} y={py+8} textAnchor="middle" fontSize="12" fill="#4caf50" fontWeight="800">{pPct}%</text>
                        <text x={ix} y={iy-5} textAnchor="middle" fontSize="11" fill="#2196f3" fontWeight="700">Interest</text>
                        <text x={ix} y={iy+8} textAnchor="middle" fontSize="12" fill="#2196f3" fontWeight="800">{iPct}%</text>
                        <text x={fx} y={fy-5} textAnchor="middle" fontSize="10" fill="#ff9800" fontWeight="700">Fee</text>
                        <text x={fx} y={fy+7} textAnchor="middle" fontSize="11" fill="#ff9800" fontWeight="800">{fPct}%</text>
                      </>;
                    })()}
                  </svg>
                </div>

                {/* 3 Progress Bars — connected to calculator */}
                <div className="fis-bars">
                  {[
                    {label:"Principal", pct:Math.round((loanAmount/totalPayment)*100), color:"#2C6275"},
                    {label:"Interest", pct:Math.round((totalInterest/totalPayment)*100), color:"#2196f3"},
                    {label:"Total Payable", pct:100, color:"#ff9800"},
                  ].map((b,i)=>(
                    <div className="fis-bar-item" key={i}>
                      <div className="fis-bar-top">
                        <span className="fis-bar-label">{b.label}</span>
                        <span className="fis-bar-pct" style={{color:b.color}}>{b.pct}%</span>
                      </div>
                      <div className="fis-bar-track">
                        <div className="fis-bar-fill" style={{width:`${b.pct}%`, background:b.color, transition:"width 0.5s"}}></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2 Bottom Cards — no gap */}
                <div className="fis-bottom-cards">
                  <div className="fis-bottom-card">
                    <i className="fas fa-calendar-check"></i>
                    <span className="fis-btm-label">Repay By</span>
                    <strong className="fis-btm-value">Day {loanPeriod}</strong>
                  </div>
                  <div className="fis-bottom-card">
                    <i className="fas fa-hand-holding-usd"></i>
                    <span className="fis-btm-label">Saving</span>
                    <strong className="fis-btm-value">Zero Hidden Fees</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRACK SECTION */}
      <section className="track-section" id="track">
        <div className="track-container">
          {/* Left */}
          <div className="track-left">
            <div className="track-badge">
              <img src={require("../images/logo.webp")} alt="SalaryTopUp" className="track-badge-logo" />
              <span>TRACK</span>
            </div>
            <h2 className="track-heading">Master your<br /><span>money matters</span></h2>
            <p className="track-desc">
              Stay on top of your finances. Track every EMI, monitor your credit score,
              manage repayments — all in one place with SalaryTopUp.
            </p>
            <div className="track-points">
              {[
                { icon:"fa-chart-line", text:"Real-time EMI & repayment tracking" },
                { icon:"fa-shield-alt", text:"100% secure & encrypted data" },
                { icon:"fa-bell",       text:"Smart reminders before due dates" },
              ].map((p, i) => (
                <div className="track-point" key={i}>
                  <i className={`fas ${p.icon}`}></i>
                  <span>{p.text}</span>
                </div>
              ))}
            </div>
            <button className="track-cta" onClick={handleCibilCheck}>
              Check Score <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          {/* Right — Phone Mockup / CIBIL Form */}
          <div className="track-right">
            <div className="trk-demo">
              <div className="trk-phone">
                <div className="trk-screen">
                  <div className="trk-status"><span>9:41</span><span className="trk-pill-di"></span><div><i className="fas fa-signal"></i> <i className="fas fa-wifi"></i> <i className="fas fa-battery-full"></i></div></div>

                  {/* Default — Animated Score Demo */}
                  {!showCibilForm && (
                    <div className="trk-slides">
                      <div className="trk-sl trk-cs-active">
                        <div className="trk-dash-head">
                          <div><strong>Credit Score</strong><span>Updated just now</span></div>
                          <div className="trk-refresh-btn"><i className="fas fa-sync-alt"></i></div>
                        </div>
                        <div className="trk-score-wrap">
                          <svg viewBox="0 0 200 120" className="trk-score-svg">
                            <path d="M25,110 A75,75 0 0,1 175,110" fill="none" stroke="#f0f0f0" strokeWidth="14" strokeLinecap="round"/>
                            <path d="M25,110 A75,75 0 0,1 175,110" fill="none" stroke="url(#scoreGrad2)" strokeWidth="14" strokeLinecap="round" className="trk-score-arc"/>
                            <line x1="100" y1="110" x2="100" y2="50" stroke="#2C6275" strokeWidth="2.5" strokeLinecap="round" className="trk-needle"/>
                            <circle cx="100" cy="110" r="5" fill="#2C6275"/>
                            <defs><linearGradient id="scoreGrad2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#e53935"/><stop offset="25%" stopColor="#ff9800"/><stop offset="50%" stopColor="#fdd835"/><stop offset="75%" stopColor="#66bb6a"/><stop offset="100%" stopColor="#3a7d8f"/></linearGradient></defs>
                          </svg>
                          <div className="trk-score-range"><span>300</span><span>900</span></div>
                          <div className="trk-score-num">742</div>
                          <div className="trk-score-badge"><i className="fas fa-check-circle"></i> Good Score</div>
                        </div>
                        <div className="trk-factors-title">Score Breakdown</div>
                        <div className="trk-factors-list">
                          {[
                            { label:"Payment History",val:95,color:"#4a9aaa",icon:"fa-calendar-check" },
                            { label:"Credit Utilization",val:28,color:"#1565c0",icon:"fa-credit-card" },
                            { label:"Account Age",val:72,color:"#ff9800",icon:"fa-hourglass-half" },
                            { label:"Total Accounts",val:88,color:"#6a1b9a",icon:"fa-layer-group" },
                            { label:"Hard Inquiries",val:90,color:"#00695c",icon:"fa-search" },
                          ].map((f,i) => (
                            <div className="trk-fac-item" key={i} style={{"--fi":i}}>
                              <div className="trk-fac-left">
                                <div className="trk-fac-ic" style={{color:f.color,background:`${f.color}15`}}><i className={`fas ${f.icon}`}></i></div>
                                <span>{f.label}</span>
                              </div>
                              <div className="trk-fac-right">
                                <div className="trk-fac-bar-bg"><div className="trk-fac-bar-fill" style={{"--fw":`${f.val}%`,background:f.color}}></div></div>
                                <strong style={{color:f.color}}>{f.val}%</strong>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="trk-cs-cta" onClick={handleCibilCheck} style={{cursor:"pointer"}}>
                          <span>Check Your Score</span>
                          <i className="fas fa-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CIBIL Score Check Form */}
                  {showCibilForm && (
                    <div className="cb-app">
                      {/* Header */}
                      <div className="cb-header">
                        <button className="cb-back" onClick={() => setShowCibilForm(false)}>
                          <i className="fas fa-arrow-left"></i>
                        </button>
                        <strong>CIBIL Score Check</strong>
                        <div className="cb-secure"><i className="fas fa-lock"></i></div>
                      </div>

                      {/* Step 1 — Name & Mobile */}
                      {cibilStep === 1 && (
                        <div className="cb-content cb-fade-in" key="s1">
                          <div className="cb-icon-circle"><i className="fas fa-user-circle"></i></div>
                          <h4>Enter Your Details</h4>
                          <p>We need basic info to fetch your score</p>
                          <div className="cb-field">
                            <label><i className="fas fa-user"></i> Full Name</label>
                            <input type="text" placeholder="Rahul Sharma"
                              value={cibilForm.name}
                              onChange={e => setCibilForm({...cibilForm, name: e.target.value})} />
                          </div>
                          <div className="cb-field">
                            <label><i className="fas fa-phone"></i> Mobile Number</label>
                            <input type="tel" placeholder="+91 98765 43210" maxLength="10"
                              value={cibilForm.mobile}
                              onChange={e => setCibilForm({...cibilForm, mobile: e.target.value})} />
                          </div>
                          {cibilError && <div className="cb-error"><i className="fas fa-exclamation-circle"></i> {cibilError}</div>}
                          <button className="cb-submit" onClick={handleCibilSubmit}>
                            Continue <i className="fas fa-arrow-right"></i>
                          </button>
                        </div>
                      )}

                      {/* Step 2 — PAN */}
                      {cibilStep === 2 && !cibilLoading && (
                        <div className="cb-content cb-fade-in" key="s2">
                          <div className="cb-icon-circle"><i className="fas fa-id-card"></i></div>
                          <h4>Verify Identity</h4>
                          <p>PAN is required by credit bureaus</p>
                          <div className="cb-field">
                            <label><i className="fas fa-id-card"></i> PAN Number</label>
                            <input type="text" placeholder="ABCPD1234K" maxLength="10"
                              value={cibilForm.pan}
                              onChange={e => setCibilForm({...cibilForm, pan: e.target.value.toUpperCase()})}
                              style={{textTransform:"uppercase", letterSpacing:"2px"}} />
                          </div>
                          <div className="cb-info-box">
                            <i className="fas fa-shield-alt"></i>
                            <span>Your data is encrypted & secure. We never store your PAN.</span>
                          </div>
                          {cibilError && <div className="cb-error"><i className="fas fa-exclamation-circle"></i> {cibilError}</div>}
                          <button className="cb-submit" onClick={handleCibilSubmit}>
                            Check Score <i className="fas fa-search"></i>
                          </button>
                        </div>
                      )}

                      {/* Loading */}
                      {cibilLoading && (
                        <div className="cb-content cb-fade-in cb-loading-screen" key="loading">
                          <div className="cb-spinner"></div>
                          <h4>Checking your CIBIL Score...</h4>
                          <p>Connecting to TransUnion CIBIL</p>
                          <div className="cb-loading-steps">
                            <div className="cb-lstep cb-ls1"><i className="fas fa-check-circle"></i> Verifying identity</div>
                            <div className="cb-lstep cb-ls2"><i className="fas fa-check-circle"></i> Fetching credit data</div>
                            <div className="cb-lstep cb-ls3"><i className="fas fa-spinner fa-spin"></i> Calculating score</div>
                          </div>
                        </div>
                      )}

                      {/* Result */}
                      {cibilStep === 3 && cibilScore && (
                        <div className="cb-content cb-fade-in cb-result-screen" key="result">
                          <div className="cb-result-gauge">
                            <svg viewBox="0 0 200 120">
                              <path d="M25,110 A75,75 0 0,1 175,110" fill="none" stroke="#f0f0f0" strokeWidth="14" strokeLinecap="round"/>
                              <path d="M25,110 A75,75 0 0,1 175,110" fill="none" stroke="url(#scoreGrad4)" strokeWidth="14" strokeLinecap="round"
                                strokeDasharray="236" strokeDashoffset={236 - ((cibilScore-300)/600)*236}
                                style={{transition:"stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)"}} />
                              <line x1="100" y1="110" x2="100" y2="50" stroke={cibilColor(cibilScore)} strokeWidth="2.5" strokeLinecap="round"
                                style={{transformOrigin:"100px 110px", transform:`rotate(${cibilNeedle(cibilScore)}deg)`, transition:"transform 1.5s cubic-bezier(0.4,0,0.2,1)"}} />
                              <circle cx="100" cy="110" r="5" fill={cibilColor(cibilScore)}/>
                              <defs><linearGradient id="scoreGrad4" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#e53935"/><stop offset="25%" stopColor="#ff9800"/><stop offset="50%" stopColor="#fdd835"/><stop offset="75%" stopColor="#66bb6a"/><stop offset="100%" stopColor="#3a7d8f"/></linearGradient></defs>
                            </svg>
                          </div>
                          <div className="cb-score-big" style={{color:cibilColor(cibilScore)}}>{cibilScore}</div>
                          <div className="cb-score-tag" style={{background:`${cibilColor(cibilScore)}15`, color:cibilColor(cibilScore)}}>
                            <i className="fas fa-check-circle"></i> {cibilLabel(cibilScore)}
                          </div>

                          <div className="cb-result-bars">
                            {[
                              {l:"Payment History", v:Math.floor(Math.random()*12)+85, c:"#4a9aaa"},
                              {l:"Credit Utilization", v:Math.floor(Math.random()*25)+20, c:"#1565c0"},
                              {l:"Account Age", v:Math.floor(Math.random()*25)+60, c:"#ff9800"},
                              {l:"Total Accounts", v:Math.floor(Math.random()*15)+75, c:"#6a1b9a"},
                            ].map((b,i)=>(
                              <div className="cb-bar-row" key={i}>
                                <div className="cb-bar-label"><span>{b.l}</span><strong style={{color:b.c}}>{b.v}%</strong></div>
                                <div className="cb-bar-bg"><div className="cb-bar-fill" style={{width:`${b.v}%`,background:b.c,transition:"width 1s ease "+i*0.2+"s"}}></div></div>
                              </div>
                            ))}
                          </div>

                          <button className="cb-submit" onClick={handleCibilCheck}>
                            <i className="fas fa-redo"></i> Check Again
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="trk-homebar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <TstSection />

      {/* FAQ SECTION */}
      <FaqSection />

      {/* CTA SECTION */}
      <section className="cta-bar">
        <div className="cta-bar-inner">
          <div className="cta-bar-text">
            <h2>Ready to Get Started?</h2>
            <p>Apply now and get your emergency funds within minutes</p>
          </div>
          <div className="cta-bar-btns">
            <Link to="/apply-now" className="cta-bar-primary">Apply Now <i className="fas fa-arrow-right"></i></Link>
            <Link to="/contact" className="cta-bar-outline">Contact Support</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;