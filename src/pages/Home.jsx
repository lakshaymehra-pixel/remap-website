import React, { useEffect, useState, useRef } from "react";
import landingpage from "../images/landingpage.webp";
import heroMobile from "../images/hero-mobile.png";
import appQrImg from "../images/app_qr.png";
import heroPerson from "../images/Picflow Images Apr 10/rithalya_rajput.png";
import heroMobilePerson from "../images/c0ce3801-9ba7-4bfe-922f-c089f6ef76da.png";
import "../css/topup.css"; // v2
import googlePlayBadge from "../assets/google-play-badge.webp";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const FALLBACK_TST = [
  { name:"Ankit Kumar",   location:"Delhi",     message:"Amazing service and very easy to use. The process was smooth and quick. I highly recommend it to everyone.", rating: 5 },
  { name:"Priya Sharma",  location:"Mumbai",    message:"Got my salary advance super fast. No paperwork, no hassle. Best experience I've ever had with a loan app.", rating: 5 },
  { name:"Rahul Verma",   location:"Bangalore", message:"Transparent fees and instant approval. Customer support was very helpful. Will definitely use again for emergencies.", rating: 5 },
  { name:"Sneha Gupta",   location:"Hyderabad", message:"I needed money urgently for a medical bill. SalaryTopUp disbursed the amount in just 15 minutes. Lifesaver!", rating: 5 },
  { name:"Vikram Singh",  location:"Jaipur",    message:"Very user-friendly app with great customer service. The interest rates are fair and the repayment process is simple.", rating: 5 },
  { name:"Neha Patel",    location:"Ahmedabad", message:"Applied at night and got approved instantly. The money was in my account by morning. Truly 24/7 service!", rating: 5 },
  { name:"Amit Mishra",   location:"Lucknow",   message:"SalaryTopUp helped me when no bank would. Quick disbursal, zero hidden charges. Highly recommended for salaried people.", rating: 5 },
  { name:"Kavita Reddy",  location:"Chennai",   message:"The entire process is digital and hassle-free. Got my loan approved in under 5 minutes. Excellent customer support too.", rating: 5 },
  { name:"Saurabh Jain",  location:"Pune",      message:"Best salary loan app I have used. The repayment is flexible and the interest rates are very competitive. Five stars!", rating: 5 },
];

const TstSection = () => {
  const [tstPage, setTstPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [tstData, setTstData] = useState(FALLBACK_TST);

  useEffect(() => {
    fetch('http://localhost:4500/api/testimonials/public')
      .then(r => r.json())
      .then(data => { if (data && data.length > 0) setTstData(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const perPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(tstData.length / perPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setTstPage(prev => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const visible = tstData.slice(tstPage * perPage, tstPage * perPage + perPage);

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
                  <span>{t.location || t.city}</span>
                </div>
              </div>
              <p className="tst-text">{t.message || t.text}</p>
              <div className="tst-stars">
                {[1,2,3,4,5].map(s => <i className={`fas fa-star`} key={s} style={{ color: s <= (t.rating || 5) ? '#f59e0b' : '#e2e8f0' }}></i>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="tst-dots">
        {Array.from({length: totalPages}).map((_, i) => (
          <span className={`tst-dot ${i === tstPage ? "tst-dot-active" : ""}`} key={i} onClick={() => setTstPage(i)}></span>
        ))}
      </div>
    </section>
  );
};

// FAQ Component
const FALLBACK_FAQS = [
  { question: "Who can apply for a SalaryTopUp loan?", answer: "Any salaried individual aged 21-58 years with a minimum monthly income of ₹15,000 can apply. You need to be working with your current employer for at least 3 months." },
  { question: "How fast can I get the loan approval?", answer: "Our AI-powered system processes applications instantly. Loans are approved quickly and the amount is disbursed to your bank account as soon as possible." },
  { question: "Do I need to provide any collateral?", answer: "No, SalaryTopUp loans are completely unsecured. You don't need to pledge any asset or provide any collateral. Your salary is your credit." },
  { question: "What documents are required to apply?", answer: "You just need your PAN card, Aadhaar card, and last 3 months bank statement. Everything is verified digitally — no physical documents needed." },
  { question: "How can I repay my loan?", answer: "You can repay via UPI, net banking, debit card, or auto-debit from your salary account. We also send reminders before the due date so you never miss a payment." },
  { question: "What is the interest rate?", answer: "Our interest rates start from 1% per day depending on your credit profile. There are no hidden charges — what you see is what you pay." },
];

// QR image component
const AppQRImage = () => (
  <img src={appQrImg} alt="Scan to Download SalaryTopUp App" className="app-popup-qr" />
);

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [faqData, setFaqData] = useState(FALLBACK_FAQS);

  useEffect(() => {
    const base = process.env.REACT_APP_API_URL || 'http://localhost:4500';
    fetch(`${base}/api/faqs/public/home`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setFaqData(data);
      })
      .catch(err => console.error('FAQ fetch failed:', err));
  }, []);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-underline"></div>
        <div className="faq-list">
          {faqData.map((faq, i) => (
            <div className={`faq-item ${openFaq === i ? "faq-open" : ""}`} key={faq._id || i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-question">
                <span>{faq.question || faq.q}</span>
                <i className={`fas fa-chevron-down faq-arrow ${openFaq === i ? "faq-arrow-up" : ""}`}></i>
              </div>
              <div className="faq-answer">
                <p>{faq.answer || faq.a}</p>
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

  const c1 = useCounter(5000, 2000, visible);
  const c2 = useCounter(25, 2000, visible);
  const c3 = useCounter(5, 2000, visible);
  const c4 = useCounter(1, 2000, visible);

  return (
    <div className="wc-stats" ref={ref}>
      <div className="wc-stat-item">

        <strong className="wc-stat-value">{Math.floor(c1)}+ Cr</strong>
        <span className="wc-stat-sub">Loan Disbursed</span>
      </div>
      <div className="wc-stat-item">

        <strong className="wc-stat-value">{Math.floor(c2)}+ Lakhs</strong>
        <span className="wc-stat-sub">Loan Customers</span>
      </div>
      <div className="wc-stat-item">

        <strong className="wc-stat-value">{Math.floor(c3)}+ Lakh</strong>
        <span className="wc-stat-sub">Active Users</span>
      </div>
      <div className="wc-stat-item">

        <strong className="wc-stat-value">{Math.floor(c4)}+ Lakh</strong>
        <span className="wc-stat-sub">Max. Loan Amount</span>
      </div>
    </div>
  );
};

function CalcCard() {
  const [amount, setAmount] = useState(10000);
  const [tenure, setTenure] = useState(25);
  const [dir, setDir] = useState(1);
  const autoRef = useRef(null);
  const rate = 0.001;
  const interest = Math.round(amount * rate * tenure);
  const total = amount + interest;

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setAmount(prev => {
        let next = prev + dir * 2000;
        if (next >= 100000) { setDir(-1); return 100000; }
        if (next <= 5000)   { setDir(1);  return 5000; }
        return next;
      });
    }, 600);
    return () => clearInterval(autoRef.current);
  }, [dir]);

  const handleAmount = (e) => { clearInterval(autoRef.current); setAmount(Number(e.target.value)); };
  const handleTenure = (e) => setTenure(Number(e.target.value));

  return (
    <div className="hp-calc-card">
      <div className="hp-calc-header">
        <i className="fas fa-calculator"></i>
        <span>Loan Calculator</span>
      </div>
      <div className="hp-calc-row">
        <span>Amount</span>
        <input
          type="range" min={5000} max={100000} step={1000}
          value={amount}
          onChange={handleAmount}
          className="hp-calc-range"
          style={{"--pct": `${((amount-5000)/(100000-5000))*100}%`}}
        />
        <strong className="hp-calc-val">₹{amount.toLocaleString('en-IN')}</strong>
      </div>
      <div className="hp-calc-row">
        <span>Tenure</span>
        <input
          type="range" min={7} max={40} step={1}
          value={tenure}
          onChange={handleTenure}
          className="hp-calc-range"
          style={{"--pct": `${((tenure-7)/(40-7))*100}%`}}
        />
        <strong className="hp-calc-val">{tenure} Days</strong>
      </div>
      <div className="hp-calc-divider" />
      <div className="hp-calc-result-row">
        <div className="hp-calc-result-item">
          <span>Interest</span>
          <strong>₹{interest.toLocaleString('en-IN')}</strong>
        </div>
        <div className="hp-calc-result-item">
          <span>Total Pay</span>
          <strong>₹{total.toLocaleString('en-IN')}</strong>
        </div>
        <div className="hp-calc-result-item">
          <span>Rate</span>
          <strong>0.1%/day</strong>
        </div>
      </div>
      <a href="/apply-now" className="hp-calc-btn">Apply Now <i className="fas fa-arrow-right"></i></a>
    </div>
  );
}

// ── Option 1: Floating Dashboard Cards ──
function HeroOpt1() {
  return (
    <div className="hopt1-wrap">
      <div className="hopt1-card hopt1-c1">
        <div className="hopt1-icon" style={{background:'#dcfce7',color:'#16a34a'}}><i className="fas fa-check-circle"></i></div>
        <div><div className="hopt1-label">Loan Approved</div><div className="hopt1-val">₹50,000</div></div>
      </div>
      <div className="hopt1-card hopt1-c2">
        <div className="hopt1-icon" style={{background:'#dbeafe',color:'#2563eb'}}><i className="fas fa-bolt"></i></div>
        <div><div className="hopt1-label">Approval Time</div><div className="hopt1-val">2 Minutes</div></div>
      </div>
      <div className="hopt1-card hopt1-c3">
        <div className="hopt1-icon" style={{background:'#fef3c7',color:'#d97706'}}><i className="fas fa-users"></i></div>
        <div><div className="hopt1-label">Happy Users</div><div className="hopt1-val">5 Lakh+</div></div>
      </div>
      <div className="hopt1-card hopt1-c4">
        <div className="hopt1-icon" style={{background:'#f3e8ff',color:'#7c3aed'}}><i className="fas fa-shield-alt"></i></div>
        <div><div className="hopt1-label">100% Secure</div><div className="hopt1-val">RBI Registered</div></div>
      </div>
      <div className="hopt1-ring" />
    </div>
  );
}

// ── Option 2: 3D Phone Mockup ──
function HeroOpt2() {
  return (
    <div className="hopt2-wrap">
      <div className="hopt2-phone">
        <div className="hopt2-screen">
          <div className="hopt2-notch" />
          <div className="hopt2-app-header">
            <div className="hopt2-app-logo">ST</div>
            <span>SalaryTopUp</span>
          </div>
          <div className="hopt2-app-amount">₹50,000</div>
          <div className="hopt2-app-label">Available Limit</div>
          <div className="hopt2-app-bar"><div className="hopt2-app-fill" /></div>
          <div className="hopt2-app-stats">
            <div><span>Rate</span><strong>0.1%</strong></div>
            <div><span>Tenure</span><strong>30 Days</strong></div>
            <div><span>Status</span><strong style={{color:'#16a34a'}}>Active</strong></div>
          </div>
          <div className="hopt2-app-btn">Apply Now</div>
        </div>
      </div>
      <div className="hopt2-badge hopt2-b1"><i className="fas fa-star" style={{color:'#f59e0b'}}></i> 4.9 Rating</div>
      <div className="hopt2-badge hopt2-b2"><i className="fas fa-download" style={{color:'#2563eb'}}></i> 5L+ Downloads</div>
    </div>
  );
}

// ── Option 3: Animated Stats Ring ──
function HeroOpt3() {
  return (
    <div className="hopt3-wrap">
      <div className="hopt3-ring-outer">
        <div className="hopt3-ring-inner">
          <div className="hopt3-center-val">₹1 Cr+</div>
          <div className="hopt3-center-label">Disbursed</div>
        </div>
        <svg className="hopt3-svg" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="none" stroke="#e2e8f0" strokeWidth="12"/>
          <circle cx="100" cy="100" r="85" fill="none" stroke="url(#grad3)" strokeWidth="12" strokeDasharray="400 534" strokeLinecap="round" transform="rotate(-90 100 100)"/>
          <defs><linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#26b9db"/><stop offset="100%" stopColor="#0d2240"/></linearGradient></defs>
        </svg>
      </div>
      <div className="hopt3-cards">
        <div className="hopt3-stat"><strong>5L+</strong><span>Users</span></div>
        <div className="hopt3-stat"><strong>2 Min</strong><span>Approval</span></div>
        <div className="hopt3-stat"><strong>0%</strong><span>Hidden Fee</span></div>
        <div className="hopt3-stat"><strong>4.9★</strong><span>Rating</span></div>
      </div>
    </div>
  );
}

// ── Option 4: Glassmorphism Cards ──
function HeroOpt4() {
  return (
    <div className="hopt4-wrap">
      <div className="hopt4-bg-circle" />
      <div className="hopt4-card hopt4-main">
        <div className="hopt4-rupee">₹</div>
        <div className="hopt4-amount">1,00,000</div>
        <div className="hopt4-sublabel">Max Loan Amount</div>
        <div className="hopt4-progress">
          <div className="hopt4-prog-fill" />
        </div>
        <div className="hopt4-row">
          <span>Processing</span><strong>Instant</strong>
        </div>
        <div className="hopt4-row">
          <span>Tenure</span><strong>7–40 Days</strong>
        </div>
      </div>
      <div className="hopt4-mini hopt4-m1">
        <i className="fas fa-check" style={{color:'#16a34a'}}></i>
        <span>No Collateral</span>
      </div>
      <div className="hopt4-mini hopt4-m2">
        <i className="fas fa-file-alt" style={{color:'#2563eb'}}></i>
        <span>Zero Paperwork</span>
      </div>
      <div className="hopt4-mini hopt4-m3">
        <i className="fas fa-bolt" style={{color:'#f59e0b'}}></i>
        <span>Instant Disbursal</span>
      </div>
    </div>
  );
}

// ── Option 5: Loan Journey Steps ──
function HeroOpt5() {
  const steps = [
    { icon: 'fas fa-user-plus', label: 'Register', color: '#2563eb', bg: '#dbeafe' },
    { icon: 'fas fa-file-alt', label: 'Apply', color: '#7c3aed', bg: '#f3e8ff' },
    { icon: 'fas fa-check-circle', label: 'Approved', color: '#16a34a', bg: '#dcfce7' },
    { icon: 'fas fa-rupee-sign', label: 'Get Money', color: '#d97706', bg: '#fef3c7' },
  ];
  return (
    <div className="hopt5-wrap">
      <div className="hopt5-title">Get Loan in 4 Easy Steps</div>
      {steps.map((s, i) => (
        <div className="hopt5-step" key={i} style={{'--delay': `${i * 0.15}s`}}>
          <div className="hopt5-icon" style={{background: s.bg, color: s.color}}>
            <i className={s.icon}></i>
          </div>
          <div className="hopt5-step-label">{s.label}</div>
          {i < steps.length - 1 && <div className="hopt5-arrow"><i className="fas fa-chevron-right"></i></div>}
        </div>
      ))}
      <div className="hopt5-bottom">
        <div className="hopt5-stat"><strong>2 Min</strong><span>Process</span></div>
        <div className="hopt5-div" />
        <div className="hopt5-stat"><strong>5L+</strong><span>Users</span></div>
        <div className="hopt5-div" />
        <div className="hopt5-stat"><strong>4.9★</strong><span>Rating</span></div>
      </div>
    </div>
  );
}

const Home = () => {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [loanPeriod, setLoanPeriod] = useState(15);
  const [interestRate, setInterestRate] = useState(0.1);
  const [currentSlide, setCurrentSlide] = useState(0);

  // App Download Popup — show instantly, then every 5s after close, hide on scroll
  const [showAppPopup, setShowAppPopup] = useState(false);
  const popupTimerRef = useRef(null);

  const closeAppPopup = () => {
    setShowAppPopup(false);
  };

  // Popup disabled — uncomment below to re-enable
  // useEffect(() => {
  //   const onScroll = () => {
  //     if (window.scrollY > 60) {
  //       setShowAppPopup(false);
  //       clearTimeout(popupTimerRef.current);
  //       popupTimerRef.current = setTimeout(() => setShowAppPopup(true), 5000);
  //     }
  //   };
  //   window.addEventListener('scroll', onScroll, { passive: true });
  //   return () => { window.removeEventListener('scroll', onScroll); clearTimeout(popupTimerRef.current); };
  // }, []);

  // CIBIL Score Check
  const [showCibilForm, setShowCibilForm] = useState(false);
  const [cibilStep, setCibilStep] = useState(1);
  const [cibilLoading, setCibilLoading] = useState(false);
  const [cibilScore, setCibilScore] = useState(null);
  const [cibilForm, setCibilForm] = useState({ name:"", mobile:"", pan:"", otp:"", consent: false });
  const [cibilOtpSent, setCibilOtpSent] = useState(false);
  const [cibilOtpTimer, setCibilOtpTimer] = useState(0);
  const cibilTimerRef = useRef(null);

  const handleCibilCheck = () => {
    setShowCibilForm(true);
    setCibilStep(1);
    setCibilScore(null);
    setCibilError("");
    setCibilOtpSent(false);
    setCibilOtpTimer(0);
    setCibilForm({ name:"", mobile:"", pan:"", otp:"", consent: false });
  };

  const startOtpTimer = () => {
    setCibilOtpTimer(30);
    clearInterval(cibilTimerRef.current);
    cibilTimerRef.current = setInterval(() => {
      setCibilOtpTimer(t => { if (t <= 1) { clearInterval(cibilTimerRef.current); return 0; } return t - 1; });
    }, 1000);
  };

  const [cibilError, setCibilError] = useState("");

  const handleCibilSubmit = async () => {
    setCibilError("");
    if (cibilStep === 1) {
      if (!cibilForm.name.trim() || cibilForm.name.trim().length < 3) {
        setCibilError("Please enter your full name (min 3 characters)"); return;
      }
      if (!/^\d{10}$/.test(cibilForm.mobile)) {
        setCibilError("Please enter a valid 10-digit mobile number"); return;
      }
      if (!cibilForm.consent) {
        setCibilError("Please agree to let us use your information"); return;
      }
      // Send OTP (demo mode — enter any 6-digit OTP)
      setCibilOtpSent(true);
      startOtpTimer();
      setCibilStep(1.5); return;
    }
    if (cibilStep === 1.5) {
      if (!cibilForm.otp || cibilForm.otp.length < 4) {
        setCibilError("Please enter the OTP sent to your mobile"); return;
      }
      setCibilStep(2); return;
    }
    // Step 2 — PAN validation: 5 letters + 4 digits + 1 letter
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(cibilForm.pan)) {
      setCibilError("Please enter a valid PAN number (e.g. ABCPD1234K)"); return;
    }
    setCibilLoading(true);
    setTimeout(async () => {
      const score = Math.floor(Math.random() * 151) + 650;
      setCibilScore(score);
      setCibilLoading(false);
      setCibilStep(3);
      // Save lead to localStorage (admin panel reads from here)
      try {
        const leads = JSON.parse(localStorage.getItem("admin_leads") || "[]");
        leads.unshift({ _id: Date.now().toString(), name: cibilForm.name, mobile: cibilForm.mobile, pan: cibilForm.pan, cibilScore: score, source: "CIBIL Check", status: "New", createdAt: new Date().toISOString() });
        localStorage.setItem("admin_leads", JSON.stringify(leads));
      } catch {}
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

        {/* ── Hero (no image — gradient design) ── */}
        <div className="hero-new">
          {/* Decorative blobs */}
          <div className="hero-blob hero-blob1" />
          <div className="hero-blob hero-blob2" />
          <div className="hero-blob hero-blob3" />

          <div className="hero-new-inner">
            {/* LEFT — Text */}
            <div className="hero-new-left">
              {/* Mobile person — shown only on mobile above text */}
              <img src={heroPerson} alt="hero" className="hp-person-mobile" />
              <div className="hero-new-badge">
                <span className="hero-live-dot"></span> India's #1 Salary Loan App
              </div>
              <h1 className="hero-new-h1">
                Sahi Financial<br />
                Decisions se<br />
                Life Banegi <span className="hero-new-highlight">Great</span>
              </h1>
              <p className="hero-new-sub">
                Achieve your life goals with a personalized approach to money. Instant salary loans, zero paperwork.
              </p>
              <div className="hero-new-stats">
                <div className="hero-new-stat">
                  <strong>5 Lakh+</strong>
                  <span>Happy Customers</span>
                </div>
                <div className="hero-new-stat-div" />
                <div className="hero-new-stat">
                  <strong>4.9 ★</strong>
                  <span>Play Store</span>
                </div>
                <div className="hero-new-stat-div" />
                <div className="hero-new-stat">
                  <strong>Zero Fee</strong>
                  <span>No Hidden Charges</span>
                </div>
              </div>
              <div className="hero-new-btns">
                <a href="https://play.google.com/store/apps/details?id=com.salarytopup.salarytopup" target="_blank" rel="noopener noreferrer" className="hero-gplay-img-btn">
                  <img src={googlePlayBadge} alt="Get it on Google Play" className="hero-gplay-img" />
                </a>
                <a href="#loans" className="hero-new-btn-outline">Apply Now &rarr;</a>
              </div>
            </div>

            {/* RIGHT — Animated Person Illustration */}
            <div className="hero-new-right">

              {/* Glow circle behind person */}
              <div className="hp-glow" />

              {/* Person image */}
              <img src={heroPerson} alt="hero" className="hp-person" />
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
          <strong>Ready for Instant Cash?</strong>
          <span>Salary loan approved in minutes, not days.</span>
        </div>

        {/* Right — Button */}
        <Link to="/apply-now" className="hsb-apply-btn">
          Check Eligibility <i className="fas fa-arrow-right"></i>
        </Link>
      </div>

      {/* WHY CHOOSE SECTION */}
      <section className="wc-section">
        <div className="wc-container">
          <div className="wc-badge-row">
            <span className="wc-badge">🏆 Trusted by 5 Lakh+ Indians</span>
          </div>
          <h2 className="wc-title">The Smarter Way to <span className="wc-title-accent">Borrow Money</span></h2>
          <p className="wc-subtitle">No long queues. No hidden fees. Just fast, fair loans built for salaried professionals.</p>

          <div className="wc-grid">
            {[
              { icon:"fa-bolt",             title:"60-Second Approval",    desc:"Application to approval in under a minute — no waiting, no follow-ups.", slug:"instant-approval", color:"#f59e0b" },
              { icon:"fa-hand-holding-usd", title:"Rates That Make Sense", desc:"Transparent pricing with no surprise charges. What you see is what you pay.", slug:"lower-interest-rates", color:"#10b981" },
              { icon:"fa-mobile-alt",       title:"100% On Your Phone",    desc:"Apply, track, and repay — everything from your smartphone, anytime.", slug:"paperless-process", color:"#6366f1" },
              { icon:"fa-shield-alt",       title:"Bank-Grade Security",   desc:"256-bit encryption keeps your data locked tight. Always private.", slug:"secure", color:"#ef4444" },
              { icon:"fa-comments",         title:"Real Human Support",    desc:"Stuck? Our team is one message away, 24 hours a day, 7 days a week.", slug:"support", color:"#26b9db" },
            ].map((card, i) => (
              <Link to={`/features/${card.slug}`} className="wc-card wc-card-link" key={i}>
                <div className="wc-card-icon" style={{background: card.color + '15', border: `1.5px solid ${card.color}30`}}>
                  <i className={`fas ${card.icon}`} style={{color: card.color}}></i>
                </div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
                <span className="wc-card-arrow" style={{color: card.color}}>Learn More <i className="fas fa-arrow-right"></i></span>
              </Link>
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
            <div className="loans-trust-grid">
              <div className="loans-trust-card">
                <div className="loans-trust-num">5L+</div>
                <div className="loans-trust-label">Happy Customers</div>
              </div>
              <div className="loans-trust-card">
                <div className="loans-trust-num">4.9★</div>
                <div className="loans-trust-label">Play Store Rating</div>
              </div>
              <div className="loans-trust-card">
                <div className="loans-trust-num">₹0</div>
                <div className="loans-trust-label">Hidden Charges</div>
              </div>
              <div className="loans-trust-card">
                <div className="loans-trust-num">₹1 Lakh+</div>
                <div className="loans-trust-label">Max Loan Amount</div>
              </div>
            </div>
            <p className="loans-trust-desc">
              SalaryTopUp is India's most trusted salary loan app — built for working professionals who need quick, transparent, and hassle-free financial support between paydays.
            </p>

            <a
              href="https://play.google.com/store/apps/details?id=com.salarytopup.salarytopup"
              target="_blank"
              rel="noopener noreferrer"
              className="loans-download-btn"
            >
              Download app &rarr;
            </a>

            <div className="loans-feat-grid">
              {[
                { icon: "fa-bolt",        title: "Quick Disbursal",       desc: "Money in your account" },
                { icon: "fa-file-alt",    title: "Minimal Docs",          desc: "PAN, Aadhaar & slip" },
                { icon: "fa-percentage",  title: "0.1% / Day",            desc: "Lowest interest rate" },
                { icon: "fa-shield-alt",  title: "100% Secure",           desc: "Bank-grade encryption" },
                { icon: "fa-headset",     title: "24/7 Support",          desc: "Always here for you" },
                { icon: "fa-redo-alt",    title: "Easy Repayment",        desc: "7 to 40 day tenure" },
              ].map((feat, i) => (
                <div className="loans-feat-tile" key={i}>
                  <div className="loans-feat-tile-icon">
                    <i className={`fas ${feat.icon}`}></i>
                  </div>
                  <div className="loans-feat-tile-title">{feat.title}</div>
                  <div className="loans-feat-tile-desc">{feat.desc}</div>
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
                            <div className="mv-ap-amount">₹1,00,000</div>
                            <div className="mv-ap-grid">
                              <div className="mv-ap-item"><span>Tenure</span><strong>30 Days</strong></div>
                              <div className="mv-ap-item"><span>Rate</span><strong>1%/day</strong></div>
                              <div className="mv-ap-item"><span>Interest</span><strong>₹30,000</strong></div>
                              <div className="mv-ap-item"><span>Total</span><strong>₹1,30,000</strong></div>
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
                            {["₹","★","◆","●","▲","₹","★","◆"].map((e,i) => (
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
                            <div className="mv-tr-amount">₹1,00,000</div>
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
            <a href="https://play.google.com/store/apps/details?id=com.salarytopup.salarytopup" target="_blank" rel="noopener noreferrer" className="cta-bar-outline"><i className="fas fa-download"></i> Download App</a>
          </div>
        </div>
      </section>

      {/* ── App Download Popup ── */}
      {showAppPopup && (
        <div className="app-popup-overlay" onClick={closeAppPopup}>
          <div className="app-popup-card" onClick={e => e.stopPropagation()}>

            {/* Close */}
            <button className="app-popup-close" onClick={closeAppPopup}><i className="fas fa-times"></i></button>

            {/* Top section — gradient bg with text */}
            <div className="app-popup-top">
              {/* Decorative dots */}
              <span className="app-popup-dot app-popup-dot-1">+</span>
              <span className="app-popup-dot app-popup-dot-2">+</span>
              <span className="app-popup-dot app-popup-dot-3">+</span>
              <span className="app-popup-dot app-popup-dot-4">+</span>

              <p className="app-popup-question">Applying for a Salary Loan?</p>
              <h3 className="app-popup-title">
                Get Instant Loan<sup className="app-popup-star">*</sup><br />
                on SalaryTopUp App
              </h3>
              <a
                href="https://play.google.com/store/apps/details?id=com.salarytopup.salarytopup"
                target="_blank"
                rel="noopener noreferrer"
                className="app-popup-scan-btn"
                onClick={closeAppPopup}
              >
                Scan QR Code to Download the App
              </a>
              <p className="app-popup-tnc">*T&amp;C Apply</p>
            </div>

            {/* Bottom section — white with QR */}
            <div className="app-popup-bottom">
              {/* Decorative floating icons */}
              <div className="app-popup-icon app-popup-icon-coins"><i className="fas fa-rupee-sign"></i></div>
              <div className="app-popup-icon app-popup-icon-bank"><i className="fas fa-university"></i></div>
              <div className="app-popup-icon app-popup-icon-check"><i className="fas fa-check-circle"></i></div>

              {/* QR Code on phone mockup */}
              <div className="app-popup-phone">
                <div className="app-popup-phone-screen">
                  <AppQRImage />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Home;