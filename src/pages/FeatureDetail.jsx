import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../css/topup.css";

const FEATURES = {
  "lower-interest-rates": {
    icon: "fa-hand-holding-usd",
    color: "#25557E",
    title: "Lower Interest Rates",
    tagline: "Affordable loans designed for salaried individuals",
    hero: "We believe that financial emergencies shouldn't cost you a fortune. That's why SalaryTopUp offers some of the most competitive interest rates in the market — starting from just 0.1% per day.",
    points: [
      { icon: "fa-percentage", title: "Rates from 0.1% per day", desc: "Our interest rates are among the lowest for short-term salary loans. No hidden markups, no surprise charges." },
      { icon: "fa-calculator", title: "Transparent calculation", desc: "You see the full breakdown — principal, interest, and processing fee — before you accept. What you see is exactly what you pay." },
      { icon: "fa-balance-scale", title: "Based on your profile", desc: "Salaried employees with good repayment history get better rates. The more you use SalaryTopUp responsibly, the lower your rate goes." },
      { icon: "fa-shield-alt", title: "No hidden charges", desc: "Zero prepayment penalty. No late fee surprises. All charges are communicated upfront before disbursement." },
      { icon: "fa-sync-alt", title: "Flexible repayment", desc: "Choose a tenure that suits your salary cycle — 7 to 40 days. Align your repayment with your payday to avoid any financial stress." },
      { icon: "fa-chart-line", title: "Better rates over time", desc: "Loyal customers and on-time repayers are rewarded with improved rate profiles in subsequent loans." },
    ],
    cta: "Apply Now & See Your Rate",
    faq: [
      { q: "What is the interest rate for a SalaryTopUp loan?", a: "Rates start from 0.1% per day and vary based on your salary, credit profile, and loan amount. The exact rate is shown before you confirm." },
      { q: "Are there any hidden charges?", a: "No. A one-time processing fee is charged, which is fully disclosed upfront. There are no hidden fees or prepayment penalties." },
      { q: "How is interest calculated?", a: "Interest is calculated on a daily basis on the outstanding principal. The total interest amount is fixed and shown before disbursement." },
    ],
  },
  "instant-approval": {
    icon: "fa-clock",
    color: "#25557E",
    title: "Instant Approval",
    tagline: "From application to approval in minutes — not days",
    hero: "Traditional banks take days or weeks to approve loans. SalaryTopUp uses AI-powered verification to approve your loan quickly — and disburse to your bank account as soon as possible.",
    points: [
      { icon: "fa-robot", title: "AI-powered verification", desc: "Our system automatically verifies your identity, income, and bank statements using advanced AI — no manual review needed." },
      { icon: "fa-bolt", title: "Quick approval", desc: "Once you submit your documents, our system processes the application instantly and sends you an approval notification." },
      { icon: "fa-university", title: "30-minute disbursement", desc: "Approved loans are transferred directly to your bank account within 30 minutes, any time of day or night." },
      { icon: "fa-mobile-alt", title: "100% online process", desc: "Apply from your phone or laptop — no branch visit, no physical documents, no waiting in queue." },
      { icon: "fa-clock", title: "24/7 availability", desc: "Our system works round the clock. Apply at 2 AM and get your money before sunrise." },
      { icon: "fa-check-circle", title: "Instant eligibility check", desc: "Know your eligibility in seconds before applying. No impact on your credit score for checking." },
    ],
    cta: "Apply Now — Get Approved Instantly",
    faq: [
      { q: "How fast is the approval process?", a: "Most applications are approved very quickly. Disbursement to your bank account happens as soon as possible after approval." },
      { q: "Does it work on weekends and holidays?", a: "Yes. Our system operates 24/7, 365 days a year including weekends and public holidays." },
      { q: "What if my application needs manual review?", a: "In rare cases, our team may reach out for additional verification. This is completed within a few hours, never days." },
    ],
  },
  "paperless-process": {
    icon: "fa-laptop",
    color: "#25557E",
    title: "Paperless Process",
    tagline: "100% digital — no printing, scanning, or visiting a branch",
    hero: "SalaryTopUp is built from the ground up to be completely paperless. From KYC verification to loan agreement signing — everything happens on your phone or computer in minutes.",
    points: [
      { icon: "fa-id-card", title: "Digital KYC", desc: "Verify your identity using your Aadhaar and PAN card digitally. No physical document submission required." },
      { icon: "fa-file-invoice", title: "E-agreement signing", desc: "Your loan agreement is signed digitally using an OTP-based e-sign. Legally valid and fully secure." },
      { icon: "fa-database", title: "Bank statement upload", desc: "Upload your last 3 months bank statements directly from your phone. We accept PDF and image formats." },
      { icon: "fa-leaf", title: "Eco-friendly", desc: "By going paperless, we reduce our environmental footprint. No paper forms, no physical files." },
      { icon: "fa-history", title: "Document history", desc: "All your documents and loan agreements are stored securely in your account for future reference." },
      { icon: "fa-map-marker-alt", title: "No branch visit ever", desc: "You never need to visit an office. Everything from application to repayment is managed online." },
    ],
    cta: "Start Your Digital Application",
    faq: [
      { q: "What documents do I need to upload?", a: "PAN card, Aadhaar card, and last 3 months bank statement. All uploaded digitally — no physical copies needed." },
      { q: "Is the e-signing legally valid?", a: "Yes. Our e-sign process is compliant with the Information Technology Act and is legally binding." },
      { q: "How are my documents stored?", a: "All documents are encrypted and stored securely on our servers. They are never shared with third parties without your consent." },
    ],
  },
  "secure": {
    icon: "fa-lock",
    color: "#25557E",
    title: "100% Secure",
    tagline: "Bank-grade security protecting your data and money",
    hero: "Your financial information is sensitive, and we treat it that way. SalaryTopUp uses the same level of encryption and security protocols as leading banks — so your data is always safe.",
    points: [
      { icon: "fa-shield-alt", title: "256-bit SSL encryption", desc: "All data transmitted between your device and our servers is encrypted using 256-bit SSL — the same standard used by banks." },
      { icon: "fa-user-secret", title: "Data privacy guaranteed", desc: "Your personal and financial data is never sold, shared, or used for advertising. It's yours and yours alone." },
      { icon: "fa-fingerprint", title: "Secure authentication", desc: "Multi-factor authentication and OTP-based login ensure only you can access your account." },
      { icon: "fa-building", title: "RBI registered NBFC", desc: "SalaryTopUp is offered through Baid Stock Broking Services Pvt. Ltd., a registered NBFC under the Reserve Bank of India." },
      { icon: "fa-eye-slash", title: "No data selling", desc: "We are committed to never selling your data to third parties, telemarketers, or advertisers." },
      { icon: "fa-server", title: "Secure cloud infrastructure", desc: "Our servers are hosted on enterprise-grade cloud infrastructure with 99.9% uptime and regular security audits." },
    ],
    cta: "Apply Securely Today",
    faq: [
      { q: "Is my bank account information safe?", a: "Yes. We use read-only access to verify your bank statement. We never store your banking credentials." },
      { q: "Who regulates SalaryTopUp?", a: "Loans are provided by Baid Stock Broking Services Pvt. Ltd., an NBFC registered with the Reserve Bank of India (Reg. No. B-14.02553)." },
      { q: "What happens to my data after loan repayment?", a: "Your data is retained as per RBI guidelines and our privacy policy. You can request deletion after the statutory period." },
    ],
  },
  "support": {
    icon: "fa-headphones-alt",
    color: "#25557E",
    title: "24/7 Support",
    tagline: "Real help, anytime you need it — day or night",
    hero: "Financial emergencies don't follow business hours. That's why our support team is available 24 hours a day, 7 days a week — via phone, WhatsApp, and email. We're always here when you need us.",
    points: [
      { icon: "fa-phone-alt", title: "Phone support", desc: "Call us anytime on our customer care number and speak to a real person who can help resolve your issue quickly." },
      { icon: "fa-whatsapp fab", title: "WhatsApp support", desc: "Message us on WhatsApp for quick responses. Share screenshots, ask questions, or track your application — all on WhatsApp." },
      { icon: "fa-envelope", title: "Email support", desc: "Send detailed queries to customercare@salarytopup.com. We respond within 2 hours during business hours and 12 hours at night." },
      { icon: "fa-comments", title: "In-app chat", desc: "Use the built-in chat feature in our app for instant messaging with our support team." },
      { icon: "fa-clock", title: "Zero wait time goal", desc: "We aim for zero hold time. Our team is trained to resolve most issues in a single call or chat session." },
      { icon: "fa-star", title: "Dedicated loan support", desc: "Questions about your specific loan? Our loan-specific support team can pull up your account and help immediately." },
    ],
    cta: "Contact Us Now",
    faq: [
      { q: "What are your support hours?", a: "Our support team is available 24/7 — including weekends and public holidays." },
      { q: "How can I reach support?", a: "Call +91 93557 53533, WhatsApp +91 8448240723, or email customercare@salarytopup.com." },
      { q: "How long does it take to resolve an issue?", a: "Most issues are resolved in a single interaction. Complex cases are escalated and resolved within 24 hours." },
    ],
  },
};

export default function FeatureDetail() {
  const { slug } = useParams();
  const feature = FEATURES[slug];

  if (!feature) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h2 style={{ color: "#0d2240" }}>Page not found</h2>
        <Link to="/" style={{ color: "#26b9db" }}>← Back to Home</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{feature.title} | SalaryTopUp</title>
        <meta name="description" content={feature.hero} />
      </Helmet>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, #0d2240 0%, #25557E 100%)`, padding: "90px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ width: 80, height: 80, borderRadius: 22, background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px" }}>
            <i className={`fas ${feature.icon}`} style={{ fontSize: "2rem", color: "#fff" }}></i>
          </div>
          <p style={{ color: "rgba(255,255,255,0.55)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 14px" }}>SalaryTopUp Feature</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 16px" }}>{feature.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", margin: "0 0 32px", lineHeight: 1.7 }}>{feature.hero}</p>
          <Link to="/apply-now" style={{ display: "inline-block", background: "#fff", color: "#25557E", textDecoration: "none", padding: "14px 36px", borderRadius: 12, fontWeight: 700, fontSize: "0.95rem", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
            {feature.cta}
          </Link>
        </div>
      </section>

      {/* Detail points */}
      <section style={{ padding: "64px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, color: "#0d2240", marginBottom: 8 }}>
            Why {feature.title}?
          </h2>
          <p style={{ textAlign: "center", color: "#64748b", marginBottom: 48, fontSize: "0.95rem" }}>{feature.tagline}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {feature.points.map((pt, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "28px 24px", border: "1px solid #e8eef2", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: feature.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className={`fas ${pt.icon}`} style={{ color: feature.color, fontSize: "1rem" }}></i>
                </div>
                <div>
                  <h4 style={{ color: "#0d2240", fontWeight: 700, margin: "0 0 6px", fontSize: "0.95rem" }}>{pt.title}</h4>
                  <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0, lineHeight: 1.6 }}>{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "56px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.6rem", fontWeight: 800, color: "#0d2240", marginBottom: 36 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {feature.faq.map((f, i) => (
              <div key={i} style={{ background: "#f8fafc", borderRadius: 12, padding: "20px 22px", border: "1px solid #e8eef2" }}>
                <h4 style={{ color: "#0d2240", fontWeight: 700, margin: "0 0 8px", fontSize: "0.92rem" }}>
                  <i className="fas fa-question-circle" style={{ color: feature.color, marginRight: 8 }}></i>{f.q}
                </h4>
                <p style={{ color: "#64748b", margin: 0, fontSize: "0.85rem", lineHeight: 1.7, paddingLeft: 24 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: `linear-gradient(135deg, #25557E, #0d2240)`, padding: "48px 24px", textAlign: "center" }}>
        <h3 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, margin: "0 0 12px" }}>Ready to experience {feature.title}?</h3>
        <p style={{ color: "rgba(255,255,255,0.75)", margin: "0 0 28px", fontSize: "0.95rem" }}>Join thousands of salaried Indians who trust SalaryTopUp</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/apply-now" style={{ background: "#fff", color: "#0d2240", textDecoration: "none", padding: "13px 32px", borderRadius: 12, fontWeight: 700, fontSize: "0.92rem" }}>
            Apply Now
          </Link>
          <Link to="/" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none", padding: "13px 32px", borderRadius: 12, fontWeight: 600, fontSize: "0.92rem", border: "1.5px solid rgba(255,255,255,0.3)" }}>
            ← Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}