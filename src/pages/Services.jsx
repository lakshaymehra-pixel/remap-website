import React from "react";
import "../css/service.css";
import { Link } from "react-router-dom";
import instant from ".././images/instant.webp"
import minimal from ".././images/minimal.webp"
import online from ".././images/online.jpg"
import flexible from ".././images/flexible.webp"
import repayment from ".././images/repayment.webp"
import collateral from ".././images/collateral.webp"
import { Helmet } from "react-helmet";

const Services = () => {
  return (
    <>
    <Helmet>
        <title>Instant salary Loans Online – Fast, Flexible & Secure</title>
        <meta property="og:title" content="Instant salary Loans Online – Fast, Flexible & Secure" />
        <meta name="description" content="Get instant approval, minimal paperwork & secure salary loans online. Trusted by 10,000+ customers. No collateral required – Apply now with Salary Top up." />
        <meta property="og:description" content="Get instant approval, minimal paperwork & secure salary loans online. Trusted by 10,000+ customers. No collateral required – Apply now with Salary Top up." />
        <link rel="canonical" href="https://salarytopup.com/services" />
    </Helmet>
      {/* Hero Section */}
      <section className="hero">
        <div className="container-service">
          <div className="hero-content-service">
            <h1>
              Instant Loans <span className="highlight-service">You Can Trust</span>
            </h1>
            <p>
            Quick, transparent loans for instant access to funds — your trusted financial partner for every need.
            </p>
            <Link to="/apply-now" className="btn btn-cta-service">Apply Now</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number-s">10 min</div>
              <div className="stat-text">Average Approval</div>
            </div>
            <div className="stat-item">
              <div className="stat-number-s">15,000+</div>
              <div className="stat-text">Loans Disbursed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number-s">100%</div>
              <div className="stat-text">Secure Process</div>
            </div>
            <div className="stat-item">
              <div className="stat-number-s">10,000+</div>
              <div className="stat-text">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <div className="section-header">
            <h2>
              Our <span className="highlight-service">Services</span>
            </h2>
            <p>Solutions that match your financial goals</p>
          </div>

          <div className="services-grid-s">
            {/* Service Card 1 */}
            <div className="service-card-s">
              <div className="service-image">
                <img src={instant} alt="" />
              </div>
              <div className="service-content">
                <h3 className="service-title">Quick Approval</h3>
                <p className="service-desc">
                  At Salary Topup, we offer fast loan approvals — often within minutes.
                </p>
                <Link to="/apply-now" className="btn btn-primary">
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="service-card">
              <div className="service-image">
                <img src={minimal} alt="" />
              </div>
              <div className="service-content">
                <h3 className="service-title">Quick Paperwork</h3>
                <p className="service-desc">
                  Personal loans with minimal paperwork — simpler than traditional banks.
                </p>
                <Link to="/apply-now" className="btn btn-primary">
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="service-card">
              <div className="service-image">
                <img src={online} alt="" />
              </div>
              <div className="service-content">
                <h3 className="service-title">Digital Application</h3>
                <p className="service-desc">
                  Salary Topup lets you apply online — anytime, anywhere.
                </p>
                <Link to="/apply-now" className="btn btn-primary">
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="service-card">
              <div className="service-image">
                <img src={flexible} alt="" />
              </div>
              <div className="service-content">
                <h3 className="service-title">–Loan Your Way</h3>
                <p className="service-desc">
                  Short-term loans offer flexible eligibility and faster approvals.
                </p>
                <Link to="/apply-now" className="btn btn-primary">
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Service Card 5 */}
            <div className="service-card">
              <div className="service-image">
                <img
                  src={repayment}
                  alt=""
                />
              </div>
              <div className="service-content">
                <h3 className="service-title">Payback Time</h3>
                <p className="service-desc">
                  Repay personal loans within 7 to 40 days.
                </p>
                <Link to="/apply-now" className="btn btn-primary">
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Service Card 6 */}
            <div className="service-card">
              <div className="service-image">
                <img src={collateral} alt="" />
              </div>
              <div className="service-content">
                <h3 className="service-title">Collateral-Free</h3>
                <p className="service-desc">
                  Personal loans are unsecured — no need for collateral like a house or vehicle.
                </p>
                <Link to="/apply-now" className="btn btn-primary">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready for Instant loan?</h2>
          <p>
            Apply now and get your funds disbursed in as little as 10 minutes
            after approval.
          </p>
          <div className="cta-buttons">
            <Link to="/apply-now" className="btn btn-cta">
              Apply Now
            </Link>
            <Link to="/contact" className="btn btn-cta-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
