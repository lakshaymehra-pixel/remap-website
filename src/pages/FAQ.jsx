import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../css/faq.css";

const FALLBACK_FAQS = [
  {
    group: "General",
    items: [
      { q: "What is Salary Topup?", a: "Salary Topup is a short-term, unsecured loan offered by a registered NBFC to help salaried individuals meet immediate financial needs — quickly and digitally." },
      { q: "How does a Salary Topup loan work?", a: "You apply online, submit your documents digitally, and receive approval within minutes. The loan amount is disbursed directly to your bank account — no collateral, no paperwork hassle." },
    ],
  },
  {
    group: "Eligibility & Amount",
    items: [
      { q: "What is the eligibility to apply for a loan?", a: "You must be at least 21 years old, a salaried employee or have a steady source of income, and have a valid bank account with your salary credited." },
      { q: "How much can I borrow through a Salary Topup loan?", a: "The loan amount typically ranges from ₹5,000 to ₹50,000, depending on your income, credit profile, and the lending policies at the time of application." },
    ],
  },
  {
    group: "Repayment",
    items: [
      { q: "What is the repayment period for a Salary Topup loan?", a: "Repayment terms range from 7 to 40 days, typically aligning with your next payday. The schedule is clearly communicated before disbursement." },
      { q: "Can I prepay or close the loan before the due date?", a: "Yes, you can repay the loan before the due date. There may be a reduced interest benefit for early closure — contact our support team for details." },
      { q: "What happens if I miss the loan repayment date?", a: "If you're unable to repay on time, contact Salary Topup immediately. Depending on your situation, we may offer repayment extensions or alternative arrangements." },
    ],
  },
  {
    group: "Documents & Security",
    items: [
      { q: "Do I need to provide collateral to get a loan?", a: "No. Salary Topup loans are fully unsecured — you do not need to pledge any asset like a house, vehicle, or gold." },
      { q: "What documents are required to apply?", a: "You'll need: PAN card, Aadhaar card (identity & address proof), latest salary slips or bank statement (last 3 months), and employment proof." },
      { q: "How fast can I receive the loan amount?", a: "Once approved, funds are typically credited to your bank account within 10–30 minutes. In some cases it may take up to a few hours depending on your bank." },
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [groupedFaqs, setGroupedFaqs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4500/api/faqs/public')
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          const grouped = data.reduce((acc, faq) => {
            const g = acc.find(x => x.group === faq.group);
            if (g) g.items.push({ q: faq.question, a: faq.answer });
            else acc.push({ group: faq.group, items: [{ q: faq.question, a: faq.answer }] });
            return acc;
          }, []);
          setGroupedFaqs(grouped);
        } else {
          setGroupedFaqs(FALLBACK_FAQS);
        }
      })
      .catch(() => setGroupedFaqs(FALLBACK_FAQS));
  }, []);

  const toggle = (key) => setOpenIndex(openIndex === key ? null : key);

  let counter = 0;

  return (
    <>
      <Helmet>
        <title>Salary Top up Loan FAQs – Quick Answers to Your Questions</title>
        <meta property="og:title" content="Salary Top up Loan FAQs – Quick Answers to Your Questions" />
        <meta name="description" content="Find answers about Salary Top up loans, eligibility, documents, loan amounts, repayment terms, and more. Learn how our short-term loans work—fast and easy!" />
        <meta property="og:description" content="Find answers about Salary Top up loans, eligibility, documents, loan amounts, repayment terms, and more. Learn how our short-term loans work—fast and easy!" />
        <link rel="canonical" href="https://salarytopup.com/faq" />
      </Helmet>

      <section className="fq-hero">
        <div className="fq-hero-inner">
          <span className="fq-hero-badge"><i className="fas fa-star"></i> Got Questions? We Have Answers</span>
          <h1>Frequently Asked <span>Questions</span></h1>
          <p>Everything you need to know about Salary Topup loans — fast, transparent, and collateral-free.</p>
        </div>
        <div className="fq-hero-wave">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none"><path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#f5f7fa"/></svg>
        </div>
      </section>

      <section className="fq-body">
        <div className="fq-container">
          {groupedFaqs.map((group, gi) => (
            <div className="fq-group" key={gi}>
              <div className="fq-group-title">{group.group}</div>
              {group.items.map((item, ii) => {
                const key = `${gi}-${ii}`;
                const isOpen = openIndex === key;
                counter++;
                const num = String(counter).padStart(2, "0");
                return (
                  <div className={`fq-item ${isOpen ? "fq-open" : ""}`} key={key}>
                    <button className="fq-question" onClick={() => toggle(key)}>
                      <div className="fq-q-left">
                        <span className="fq-q-num">{num}</span>
                        <span className="fq-q-text">{item.q}</span>
                      </div>
                      <span className="fq-q-icon">
                        <i className={`fas fa-chevron-${isOpen ? "up" : "down"}`}></i>
                      </span>
                    </button>
                    <div className="fq-answer">
                      <div className="fq-answer-inner">{item.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <div className="fq-cta">
        <div className="fq-cta-inner">
          <div className="fq-cta-text">
            <h2>Still have questions?</h2>
            <p>Our support team is ready to help you — apply now or get in touch.</p>
          </div>
          <div className="fq-cta-btns">
            <Link to="/apply-now" className="fq-btn-primary">Apply Now <i className="fas fa-arrow-right"></i></Link>
            <Link to="/contact" className="fq-btn-outline"><i className="fas fa-headset"></i> Contact Support</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
