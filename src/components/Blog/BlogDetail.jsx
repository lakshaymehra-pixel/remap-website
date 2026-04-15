import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../../css/Common.css";
import "./BlogDetail.css";
import { useParams, Link } from "react-router-dom";

const ADMIN_API = "http://localhost:4500/public";

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`bd-faq-item ${open ? "bd-faq-open" : ""}`}>
      <button className="bd-faq-q" onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <div className="bd-faq-icon">{open ? "−" : "+"}</div>
      </button>
      {open && <div className="bd-faq-a">{answer}</div>}
    </div>
  );
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [formData, setFormData] = useState({ name: "", mobile: "", email: "" });
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    fetch(`${ADMIN_API}/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Status === 1) {
          const b = data.data || {};
          setBlog(b);
          if (b.author) {
            fetch(`http://localhost:4500/api/authors/public?name=${encodeURIComponent(b.author)}`)
              .then(r => r.json())
              .then(d => { if (d && d.avatar_url) setAuthorData(d); })
              .catch(() => {});
          }
        }
      })
      .catch(() => {});

    fetch(`${ADMIN_API}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Status === 1) {
          const all = data.data || [];
          setRelatedBlogs(all.filter((b) => b.slug !== slug).slice(0, 3));
        }
      })
      .catch(() => {});
  }, [slug]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you shortly.");
    setFormData({ name: "", mobile: "", email: "" });
  };

  const category = blog.category || "Finance";
  const author = blog.author || "SalaryTopUp Team";

  const metaTitle = blog.meta_title || blog.title || "Blog | SalaryTopUp";
  const metaDesc = blog.meta_description || blog.short_description || "Read our latest blog on salary loans and financial tips.";
  const ogImage = blog.banner_image_url || "";
  const canonical = `https://salarytopup.com/blog/${blog.slug || ""}`;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        {blog.focus_keyword && <meta name="keywords" content={blog.focus_keyword} />}
        <link rel="canonical" href={canonical} />
        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        {/* Article meta */}
        {blog.createdAt && <meta property="article:published_time" content={blog.createdAt} />}
        {blog.tags && Array.isArray(blog.tags) && blog.tags.map(tag => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
      </Helmet>

      {/* Sticky bottom CTA — mobile only */}
      <div className="bd-sticky-bar">
        <a href="/apply-now" className="bd-sticky-apply">
          <i className="fas fa-paper-plane"></i> Apply Now
        </a>
        <a href="tel:+919355753533" className="bd-sticky-call">
          <i className="fas fa-phone"></i> Call Now
        </a>
      </div>

      <div className="bd-page">
        <div className="bd-container">

          {/* ===== LEFT — Blog Content ===== */}
          <div className="bd-left">

            {/* Category + Date */}
            <div className="bd-meta">
              <span className="bd-category">{category}</span>
              <span className="bd-date">
                <i className="far fa-calendar-alt"></i> {formatDate(blog.createdAt)}
              </span>
            </div>

            {/* Title */}
            <h1 className="bd-title">{blog.title}</h1>

            {/* Author + Social */}
            <div className="bd-author-row">
              <div className="bd-author">
                <div className="bd-author-avatar">
                  {authorData?.avatar_url
                    ? <img src={authorData.avatar_url} alt={author} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    : <i className="fas fa-user"></i>
                  }
                </div>
                <div className="bd-author-info">
                  <span className="bd-author-label">Written by</span>
                  <span className="bd-author-name">{author}</span>
                </div>
              </div>
              <div className="bd-social">
                <a href="https://www.facebook.com/profile.php?id=61574094973748" target="_blank" rel="noopener noreferrer" className="bd-soc-btn bd-soc-fb">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://x.com/SalaryTopup" target="_blank" rel="noopener noreferrer" className="bd-soc-btn bd-soc-tw">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width:"13px",height:"13px"}}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.instagram.com/salary_topup" target="_blank" rel="noopener noreferrer" className="bd-soc-btn bd-soc-ig">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/salary-topup/" target="_blank" rel="noopener noreferrer" className="bd-soc-btn bd-soc-li">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            {/* Banner Image */}
            {blog.banner_image_url && (
              <div className="bd-banner">
                <img src={blog.banner_image_url} alt={blog.title} />
              </div>
            )}

            {/* Short Description */}
            {blog.short_description && (
              <p className="bd-short-desc">{blog.short_description}</p>
            )}

            {/* Long Content */}
            <div
              className="bd-content"
              dangerouslySetInnerHTML={{ __html: blog.long_description }}
            />

            {/* FAQs Section */}
            {blog.faqs && blog.faqs.length > 0 && (
              <div className="bd-faqs">
                <h3 className="bd-faqs-title">Frequently Asked Questions</h3>
                <p className="bd-faqs-subtitle">Everything you need to know — answered clearly.</p>
                {blog.faqs.map((faq, i) => (
                  <FaqItem key={i} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            )}

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
              <div className="bd-related">
                <h3 className="bd-related-title">You Must Also Read</h3>
                <div className="bd-related-grid">
                  {relatedBlogs.map((rb) => (
                    <Link to={`/blog/${rb.slug}`} key={rb._id} className="bd-related-card">
                      <img src={rb.thumb_image_url} alt={rb.title} className="bd-related-img" />
                      <div className="bd-related-body">
                        <span className="bd-related-cat">{rb.category || "Finance"}</span>
                        <p className="bd-related-heading">{rb.title}</p>
                        <span className="bd-related-date">
                          <i className="far fa-calendar-alt"></i> {formatDate(rb.createdAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ===== RIGHT — Static Loan Form ===== */}
          <div className="bd-right">
            <div className="bd-form-card">
              <h3 className="bd-form-title">Apply for Instant Loan</h3>
              <p className="bd-form-sub">Get funds fast. No paperwork needed.</p>
              <form className="bd-form" onSubmit={handleFormSubmit}>
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleFormChange} required />
                <input type="tel" name="mobile" placeholder="Mobile Number" maxLength="10" value={formData.mobile} onChange={handleFormChange} required />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleFormChange} required />
                <button type="submit" className="bd-form-btn">
                  Get Free Report <i className="fas fa-arrow-right"></i>
                </button>
              </form>
              <div className="bd-form-features">
                <div className="bd-feat-item"><i className="fas fa-check-circle"></i> Instant Approval</div>
                <div className="bd-feat-item"><i className="fas fa-check-circle"></i> No Collateral</div>
                <div className="bd-feat-item"><i className="fas fa-check-circle"></i> 100% Digital</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default BlogDetail;