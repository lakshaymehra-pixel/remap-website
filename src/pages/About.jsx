import React from "react";
import "../css/about.css";
import aboutus from "../images/aboutus.webp";
import aboutHeroBg from "../images/about-hero-bg.png";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
    <Helmet>
        <title>Instant salary Loans for Salaried Professionals | Salary Topup</title>
        <meta property="og:title" content="Instant salary Loans for Salaried Professionals | Salary Topup" />
        <meta name="description" content="Get fast, fully digital salary loans with instant approval & minimal documents. Trusted NBFC for salaried professionals across India – Apply in 10 mins!" />
        <meta property="og:description" content="Get fast, fully digital salary loans with instant approval & minimal documents. Trusted NBFC for salaried professionals across India – Apply in 10 mins!" />
        <link rel="canonical" href="https://salarytopup.com/about-us" />
    </Helmet>

      {/* About Hero Section */}
      <section className="abt-hero">
        <img src={aboutHeroBg} alt="" className="abt-hero-bg" />
        <div className="abt-hero-overlay"></div>
        <div className="abt-hero-content">
          <h1>About Us</h1>
          <p>Empowering salaried professionals with instant, transparent<br />& hassle-free financial solutions — anytime, anywhere.</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="abt-story">
        <div className="abt-story-inner">
          <h2>Our Story</h2>
          <h3>Building Financial Bridges</h3>
          <p>
            At SalaryTopup, we understand that financial needs can arise anytime—whether it's an emergency
            or a personal goal. Our journey began with a vision to make salary loans simple, fast,
            and accessible for salaried professionals across India. As a technology-driven NBFC, we provide
            a fully digital lending experience with quick approvals, minimal documentation, and transparent
            processes. Our mission is to remove the complexities of traditional lending and provide reliable
            financial support whenever it is needed.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="abt-mission">
        <div className="abt-mission-inner">
          {/* Left — Image Placeholder */}
          <div className="abt-mission-img">
            <div className="abt-img-placeholder">
              <i className="fas fa-bullseye"></i>
            </div>
          </div>

          {/* Right — Content */}
          <div className="abt-mission-content">
            <h2>Our Mission</h2>
            <h3>Empowering Your Financial Decisions</h3>
            <p>
              Our mission is to simplify personal finance for salaried professionals by
              providing fast, flexible, and fully digital salary loans. Through advanced
              technology and responsible lending, we ensure quick approvals,
              transparent processes, and secure financial solutions that help
              individuals manage their financial needs with confidence.
            </p>

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
            <h3>Leading the Future of Digital Lending</h3>
            <p>
              Our vision is to become a trusted digital lending platform in
              India, providing salaried professionals with fast, secure, and
              transparent access to salary loans. By leveraging advanced
              technology and a customer-first approach, we aim to simplify
              the borrowing process and help individuals achieve their
              financial goals with confidence.
            </p>
          </div>
          <div className="abt-vision-img">
            <div className="abt-vision-placeholder">
              <i className="fas fa-eye"></i>
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
              { icon:"fa-hand-holding-usd", num:"15,000+", label:"Loans Disbursed" },
              { icon:"fa-rupee-sign",        num:"₹50Cr+",  label:"Total Loan Amount" },
              { icon:"fa-users",             num:"10,000+", label:"Happy Customers" },
              { icon:"fa-chart-line",        num:"250+",    label:"Finance Experts" },
            ].map((s,i) => (
              <div className="abt-impact-card" key={i}>
                <div className="abt-impact-icon"><i className={`fas ${s.icon}`}></i></div>
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
