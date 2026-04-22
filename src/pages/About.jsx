import React, { useEffect, useState } from "react";
import "../css/about.css";
import aboutus from "../images/aboutus.webp";
import aboutHeroBg from "../images/about-hero-bg.png";
import { Helmet } from "react-helmet";

const FALLBACK = {
  story: `At SalaryTopup, we understand that financial needs can arise anytime—whether it's an emergency or a personal goal. Our journey began with a vision to make salary loans simple, fast, and accessible for salaried professionals across India. As a technology-driven NBFC, we provide a fully digital lending experience with quick approvals, minimal documentation, and transparent processes. Our mission is to remove the complexities of traditional lending and provide reliable financial support whenever it is needed.`,
  mission: `Our mission is to simplify personal finance for salaried professionals by providing fast, flexible, and fully digital salary loans. Through advanced technology and responsible lending, we ensure quick approvals, transparent processes, and secure financial solutions that help individuals manage their financial needs with confidence.`,
  vision: `Our vision is to become a trusted digital lending platform in India, providing salaried professionals with fast, secure, and transparent access to salary loans. By leveraging advanced technology and a customer-first approach, we aim to simplify the borrowing process and help individuals achieve their financial goals with confidence.`,
};

function parseSection(html, sectionKeyword) {
  if (!html) return { h3: '', p: '' };
  const div = document.createElement('div');
  div.innerHTML = html;
  let capture = false;
  let h3 = '', p = '';
  div.childNodes.forEach(node => {
    if (node.nodeName === 'H2') {
      capture = node.textContent.toLowerCase().includes(sectionKeyword);
    } else if (capture && node.nodeName === 'H3' && !h3) {
      h3 = node.textContent.trim();
    } else if (capture && node.nodeName === 'P' && !p) {
      p = node.textContent.trim();
    }
  });
  return { h3, p };
}

const About = () => {
  const [cms, setCms] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'https://backend-production-bf30.up.railway.app'}/api/pages/public/about-us`)
      .then(r => r.json())
      .then(data => {
        if (data && data.content) {
          setCms({
            story: parseSection(data.content, 'story'),
            mission: parseSection(data.content, 'mission'),
            vision: parseSection(data.content, 'vision'),
          });
        }
      })
      .catch(() => {});
  }, []);

  const text = {
    storyH3: cms?.story?.h3 || 'Building Financial Bridges',
    storyP: cms?.story?.p || FALLBACK.story,
    missionH3: cms?.mission?.h3 || 'Empowering Your Financial Decisions',
    missionP: cms?.mission?.p || FALLBACK.mission,
    visionH3: cms?.vision?.h3 || 'Leading the Future of Digital Lending',
    visionP: cms?.vision?.p || FALLBACK.vision,
  };

  return (
    <>
    <Helmet>
        <title>Instant salary Loans for Salaried Professionals | Salary Topup</title>
        <meta property="og:title" content="Instant salary Loans for Salaried Professionals | Salary Topup" />
        <meta name="description" content="Get fast, fully digital salary loans with instant approval & minimal documents. Trusted NBFC for salaried professionals across India – Apply now!" />
        <meta property="og:description" content="Get fast, fully digital salary loans with instant approval & minimal documents. Trusted NBFC for salaried professionals across India – Apply now!" />
        <link rel="canonical" href="https://salarytopup.com/about-us" />
    </Helmet>

      {/* About Hero Section */}
      <section className="abt-hero">
        <img src={aboutHeroBg} alt="" className="abt-hero-bg" />
        <div className="abt-hero-overlay"></div>
        <div className="abt-hero-content">
          <h1>About Us</h1>
          <p>Empowering salaried professionals with instant, transparent<br />& hassle-free financial solutions anytime, anywhere.</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="abt-story">
        <div className="abt-story-inner">
          <h2>Our Story</h2>
          <h3>{text.storyH3}</h3>
          <p>{text.storyP}</p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="abt-mission">
        <div className="abt-mission-inner">
          {/* Left — Animated Mission Visual (Target + Arrow SVG) */}
          <div className="abt-mission-img">
            <div className="msn-visual">

              {/* SVG Target with arrow */}
              <svg className="msn-svg" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer ring */}
                <circle cx="130" cy="130" r="118" stroke="#25557E" strokeWidth="10" fill="none" strokeLinecap="round" className="msn-svg-ring msn-svg-r1"/>
                {/* Ring 2 */}
                <circle cx="130" cy="130" r="88" stroke="#25557E" strokeWidth="10" fill="none" strokeLinecap="round" className="msn-svg-ring msn-svg-r2"/>
                {/* Ring 3 */}
                <circle cx="130" cy="130" r="58" stroke="#25557E" strokeWidth="10" fill="none" strokeLinecap="round" className="msn-svg-ring msn-svg-r3"/>
                {/* Inner ring */}
                <circle cx="130" cy="130" r="28" stroke="#25557E" strokeWidth="10" fill="none" className="msn-svg-ring msn-svg-r4"/>
                {/* Center dot */}
                <circle cx="130" cy="130" r="10" fill="#25557E" className="msn-svg-dot"/>

                {/* Arrow — shaft from top-right to center */}
                <g className="msn-svg-arrow">
                  {/* Shaft */}
                  <line x1="218" y1="42" x2="134" y2="126" stroke="#1a1a2e" strokeWidth="9" strokeLinecap="round"/>
                  {/* Arrowhead (triangle at center end) */}
                  <polygon points="134,126 118,108 150,110" fill="#1a1a2e"/>
                  {/* Tail feather top */}
                  <line x1="218" y1="42" x2="230" y2="28" stroke="#1a1a2e" strokeWidth="6" strokeLinecap="round"/>
                  <line x1="218" y1="42" x2="234" y2="46" stroke="#1a1a2e" strokeWidth="6" strokeLinecap="round"/>
                  {/* Tail feather bottom */}
                  <line x1="210" y1="50" x2="222" y2="34" stroke="#1a1a2e" strokeWidth="6" strokeLinecap="round"/>
                  <line x1="210" y1="50" x2="228" y2="54" stroke="#1a1a2e" strokeWidth="6" strokeLinecap="round"/>
                </g>
              </svg>

              {/* Floating stat chips */}
              <div className="msn-chip msn-chip1">
                <i className="fas fa-bolt" /> Fast Approval
              </div>
              <div className="msn-chip msn-chip2">
                <i className="fas fa-shield-alt" /> 100% Secure
              </div>
              <div className="msn-chip msn-chip3">
                <i className="fas fa-users" /> 5 Lakh+ Customers
              </div>

              {/* Ripple on center after arrow hits */}
              <div className="msn-ripple msn-rip1" />
              <div className="msn-ripple msn-rip2" />
              <div className="msn-ripple msn-rip3" />

            </div>
          </div>

          {/* Right — Content */}
          <div className="abt-mission-content">
            <h2>Our Mission</h2>
            <h3>{text.missionH3}</h3>
            <p>{text.missionP}</p>

            {/* Feature Cards */}
            <div className="abt-features">
              {[
                { icon:"fa-bolt", title:"Fast Approvals", desc:"Get your loan approved with in minutes" },
                { icon:"fa-globe", title:"Fully Digital", desc:"Complete Online application Process" },
                { icon:"fa-shield-alt", title:"Safe & Secure", desc:"Safe, secure and transparent lending" },
              ].map((f,i) => (
                <div className="abt-feat-card" key={i}>
                  <div className="abt-feat-icon"><i className={`fas ${f.icon}`}></i></div>
                  <div className="abt-feat-text">
                    <strong>{f.title}</strong>
                    <span>{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="abt-vision">
        <div className="abt-vision-row">
          <div className="abt-vision-inner">
            <h2>Our Vision</h2>
            <h3>{text.visionH3}</h3>
            <p>{text.visionP}</p>
          </div>
          <div className="abt-vision-img">
            <div className="vsn-visual">
              {/* Animated SVG — Rising graph + star/horizon */}
              <svg className="vsn-svg" viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Grid lines */}
                <line x1="40" y1="180" x2="270" y2="180" stroke="#25557E" strokeWidth="1.5" strokeOpacity="0.15"/>
                <line x1="40" y1="140" x2="270" y2="140" stroke="#25557E" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.12"/>
                <line x1="40" y1="100" x2="270" y2="100" stroke="#25557E" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.12"/>
                <line x1="40" y1="60"  x2="270" y2="60"  stroke="#25557E" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.12"/>

                {/* Y axis */}
                <line x1="40" y1="20" x2="40" y2="180" stroke="#25557E" strokeWidth="1.5" strokeOpacity="0.2"/>

                {/* Filled area under chart */}
                <path className="vsn-area" d="M40 180 L80 160 L120 145 L160 110 L200 80 L240 50 L270 30 L270 180 Z"
                  fill="url(#vsnGrad)" opacity="0.18"/>

                {/* Rising chart line */}
                <path className="vsn-line" d="M40 180 L80 160 L120 145 L160 110 L200 80 L240 50 L270 30"
                  stroke="#25557E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                  fill="none" strokeDasharray="500" strokeDashoffset="500"/>

                {/* Data dots */}
                <circle className="vsn-dot vsn-d1" cx="80"  cy="160" r="5" fill="#fff" stroke="#25557E" strokeWidth="2.5"/>
                <circle className="vsn-dot vsn-d2" cx="120" cy="145" r="5" fill="#fff" stroke="#25557E" strokeWidth="2.5"/>
                <circle className="vsn-dot vsn-d3" cx="160" cy="110" r="5" fill="#fff" stroke="#25557E" strokeWidth="2.5"/>
                <circle className="vsn-dot vsn-d4" cx="200" cy="80"  r="5" fill="#fff" stroke="#25557E" strokeWidth="2.5"/>
                <circle className="vsn-dot vsn-d5" cx="240" cy="50"  r="5" fill="#fff" stroke="#25557E" strokeWidth="2.5"/>

                {/* Star / sparkle at top */}
                <g className="vsn-star" transform="translate(270,30)">
                  <circle cx="0" cy="0" r="9" fill="#25557E"/>
                  <line x1="0" y1="-16" x2="0" y2="16" stroke="#25557E" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
                  <line x1="-16" y1="0" x2="16" y2="0" stroke="#25557E" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
                  <line x1="-11" y1="-11" x2="11" y2="11" stroke="#25557E" strokeWidth="2" strokeLinecap="round" opacity="0.25"/>
                  <line x1="11" y1="-11" x2="-11" y2="11" stroke="#25557E" strokeWidth="2" strokeLinecap="round" opacity="0.25"/>
                </g>

                {/* Gradient def */}
                <defs>
                  <linearGradient id="vsnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#25557E" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#25557E" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating label chips */}
              <div className="vsn-chip vsn-chip1"><i className="fas fa-chart-line"/> Growth</div>
              <div className="vsn-chip vsn-chip2"><i className="fas fa-star"/> Trusted</div>
              <div className="vsn-chip vsn-chip3"><i className="fas fa-rocket"/> Future-ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="abt-impact">
        <div className="abt-impact-inner">
          <h2>Our Impact</h2>
          <p className="abt-impact-sub">Numbers that define our journey</p>
          <div className="abt-impact-grid">
            {[
              {
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2C637F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><path d="M20 12V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v5"/><path d="M2 15c0-1.1.9-2 2-2h1l3 4h8l3-4h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z"/><path d="M9 7h6M9 10h4"/></svg>,
                num:"15,000+", label:"Loans Disbursed"
              },
              {
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2C637F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M7 15h2M14 15h3"/></svg>,
                num:"₹50Cr+", label:"Total Loan Amount"
              },
              {
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2C637F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><circle cx="9" cy="6" r="3"/><path d="M1 20v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/><circle cx="18" cy="6" r="2.5"/><path d="M22 20v-1a4 4 0 0 0-3-3.87"/></svg>,
                num:"5 Lakh+", label:"Happy Customers"
              },
              {
                svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2C637F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
                num:"250+", label:"Finance Experts"
              },
            ].map((s,i) => (
              <div className="abt-impact-card" key={i}>
                <div className="abt-impact-icon">{s.svg}</div>
                <div className="abt-impact-num">{s.num}</div>
                <div className="abt-impact-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {/* CTA Bar */}
      <div className="abt-cta-bar">
        <span>Achieve More, Worry Less. Get the Financial Support You Need Today.</span>
        <a href="/apply-now" className="abt-cta-btn">Apply Now</a>
      </div>
    </>
  );
};

export default About;
