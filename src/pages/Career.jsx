import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../css/career.css";

const API = "http://localhost:4500/public";
const APPLY_API = "http://localhost:4500/api/job-applications/apply";

const WHY_ITEMS = [
  { icon: <i className="fas fa-rocket"></i>, title: "Fast Growth", desc: "Work in a high-growth startup with real ownership and impact." },
  { icon: <i className="fas fa-lightbulb"></i>, title: "Innovation First", desc: "Your ideas matter. We encourage creativity and experimentation." },
  { icon: <i className="fas fa-laptop-house"></i>, title: "Flexible Work", desc: "Hybrid and remote options available for most roles." },
  { icon: <i className="fas fa-hand-holding-heart"></i>, title: "Impactful Work", desc: "Help millions of Indians access credit when they need it most." },
];

export default function Career() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [applyJob, setApplyJob] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", experience: "", current_company: "", cover_letter: "" });
  const [cvFile, setCvFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`${API}/careers`)
      .then(r => r.json())
      .then(d => { if (d.Status === 1) setJobs(d.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openApply = (job) => {
    setApplyJob(job);
    setSelected(null);
    setForm({ name: "", email: "", phone: "", experience: "", current_company: "", cover_letter: "" });
    setCvFile(null);
    setSubmitted(false);
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!cvFile) { alert("Please upload your CV / Resume (PDF)"); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("career_id", applyJob._id);
      fd.append("job_title", applyJob.title);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("cv", cvFile);
      const res = await fetch(APPLY_API, { method: "POST", body: fd });
      const data = await res.json();
      if (data.Status === 1) setSubmitted(true);
      else alert("Submission failed. Please try again.");
    } catch { alert("Error submitting. Please try again."); }
    finally { setSubmitting(false); }
  };

  return (
    <>
      <Helmet>
        <title>Careers | SalaryTopUp</title>
        <meta name="description" content="Join the SalaryTopUp team. Explore exciting career opportunities in fintech." />
      </Helmet>

      {/* Hero */}
      <section className="cr-hero">
        <div className="cr-hero-inner">
          <span className="cr-hero-badge"><i className="fas fa-star" style={{ marginRight: 6 }}></i>We're Hiring</span>
          <h1>Join the <span>SalaryTopUp</span> Team</h1>
          <p>Be part of a fast-growing fintech transforming how India accesses emergency credit. We build products that matter.</p>
        </div>
      </section>

      {/* Why Join */}
      <section className="cr-why">
        <div className="cr-why-inner">
          <h2>Why Work With Us?</h2>
          <div className="cr-why-grid">
            {WHY_ITEMS.map((item, i) => (
              <div className="cr-why-card" key={i}>
                <div className="cr-why-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="cr-jobs">
        <div className="cr-jobs-inner">
          <div className="cr-jobs-header">
            <h2>Open Positions</h2>
            <p>We're always looking for talented people to join our mission.</p>
          </div>

          {loading && <div className="cr-empty">Loading positions...</div>}
          {!loading && jobs.length === 0 && <div className="cr-empty">No open positions right now. Check back soon!</div>}

          <div className="cr-jobs-list">
            {jobs.map((job) => (
              <div className="cr-job-card" key={job._id}>
                <div className="cr-job-left">
                  <div className="cr-job-title-row">
                    <h4 className="cr-job-title">{job.title}</h4>
                    {job.openings > 1 && <span className="cr-job-openings">{job.openings} Openings</span>}
                  </div>
                  {job.short_desc && <p className="cr-job-desc">{job.short_desc}</p>}
                  <div className="cr-job-tags">
                    <span className="cr-tag cr-tag-blue"><i className="fas fa-briefcase" style={{ marginRight: 5 }}></i>{job.type}</span>
                    <span className="cr-tag cr-tag-green"><i className="fas fa-map-marker-alt" style={{ marginRight: 5 }}></i>{job.location}</span>
                    {job.department && <span className="cr-tag cr-tag-yellow">{job.department}</span>}
                    {job.experience && <span className="cr-tag cr-tag-gray"><i className="fas fa-user-clock" style={{ marginRight: 5 }}></i>{job.experience}</span>}
                    {job.salary && <span className="cr-tag cr-tag-pink"><i className="fas fa-rupee-sign" style={{ marginRight: 5 }}></i>{job.salary}</span>}
                  </div>
                </div>
                <div className="cr-job-actions">
                  <button className="cr-btn-outline" onClick={() => setSelected(job)}>View Details</button>
                  <button className="cr-btn-primary" onClick={() => openApply(job)}>Apply Now</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cr-cta-box">
            <h4>Don't see your role?</h4>
            <p>We're always open to meeting great people. Send us your resume and we'll be in touch.</p>
            <a href="mailto:careers@salarytopup.com"><i className="fas fa-envelope" style={{ marginRight: 8 }}></i>careers@salarytopup.com</a>
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      {selected && (
        <div className="cr-modal-overlay" onClick={() => setSelected(null)}>
          <div className="cr-modal cr-modal-detail" onClick={e => e.stopPropagation()}>
            {/* Gradient Header */}
            <div className="cr-modal-header">
              <div className="cr-modal-header-inner">
                <div>
                  <h2 className="cr-modal-title">{selected.title}</h2>
                  <div className="cr-job-tags">
                    <span className="cr-tag cr-tag-blue"><i className="fas fa-briefcase" style={{ marginRight: 5 }}></i>{selected.type}</span>
                    <span className="cr-tag cr-tag-green"><i className="fas fa-map-marker-alt" style={{ marginRight: 5 }}></i>{selected.location}</span>
                    {selected.department && <span className="cr-tag cr-tag-yellow">{selected.department}</span>}
                    {selected.experience && <span className="cr-tag cr-tag-gray"><i className="fas fa-user-clock" style={{ marginRight: 5 }}></i>{selected.experience}</span>}
                    {selected.salary && <span className="cr-tag cr-tag-pink"><i className="fas fa-rupee-sign" style={{ marginRight: 5 }}></i>{selected.salary}</span>}
                    {selected.openings > 1 && <span className="cr-job-openings" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}>{selected.openings} Openings</span>}
                  </div>
                </div>
                <button className="cr-modal-close" onClick={() => setSelected(null)}>×</button>
              </div>
            </div>

            {/* Body */}
            <div className="cr-modal-body">
              {selected.short_desc && <p className="cr-detail-desc">{selected.short_desc}</p>}

              {selected.about_role && (
                <div className="cr-detail-section">
                  <h4>About the Role</h4>
                  <p>{selected.about_role}</p>
                </div>
              )}
              {selected.responsibilities?.length > 0 && (
                <div className="cr-detail-section">
                  <h4>Key Responsibilities</h4>
                  <ul>{selected.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
                </div>
              )}
              {selected.requirements?.length > 0 && (
                <div className="cr-detail-section">
                  <h4>Requirements</h4>
                  <ul>{selected.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
                </div>
              )}
              {selected.nice_to_have?.length > 0 && (
                <div className="cr-detail-section">
                  <h4>Nice to Have</h4>
                  <ul>{selected.nice_to_have.map((r, i) => <li key={i}>{r}</li>)}</ul>
                </div>
              )}
              {selected.benefits?.length > 0 && (
                <div className="cr-detail-section">
                  <h4>Benefits & Perks</h4>
                  <ul>{selected.benefits.map((r, i) => <li key={i}>{r}</li>)}</ul>
                </div>
              )}

              <button className="cr-detail-apply-btn" onClick={() => openApply(selected)}>
                Apply for this Position <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {applyJob && (
        <div className="cr-modal-overlay" onClick={() => setApplyJob(null)}>
          <div className="cr-modal cr-modal-apply" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div className="cr-success">
                <div className="cr-success-icon"><i className="fas fa-check"></i></div>
                <h3>Application Submitted!</h3>
                <p>Thank you for applying for <strong>{applyJob.title}</strong>. Our team will review your application and get back to you soon.</p>
                <button className="cr-success-close" onClick={() => setApplyJob(null)}>Close</button>
              </div>
            ) : (
              <>
                <div className="cr-apply-header">
                  <div>
                    <h3 className="cr-apply-title">Apply for {applyJob.title}</h3>
                    <div className="cr-job-tags">
                      <span className="cr-tag cr-tag-blue">{applyJob.type}</span>
                      <span className="cr-tag cr-tag-green"><i className="fas fa-map-marker-alt" style={{ marginRight: 5 }}></i>{applyJob.location}</span>
                    </div>
                  </div>
                  <button className="cr-modal-close" onClick={() => setApplyJob(null)}>×</button>
                </div>
                <form className="cr-form cr-form-padded" onSubmit={handleApplySubmit}>
                  <div className="cr-form-grid">
                    <div>
                      <label>Full Name *</label>
                      <input required placeholder="Your full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div>
                      <label>Phone Number *</label>
                      <input required placeholder="10-digit mobile" maxLength="10" pattern="\d{10}" title="Enter exactly 10 digits" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))} />
                    </div>
                    <div className="cr-form-full">
                      <label>Email Address *</label>
                      <input required type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div>
                      <label>Total Experience *</label>
                      <input required placeholder="e.g. 2 years" value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} />
                    </div>
                    <div>
                      <label>Current Company *</label>
                      <input required placeholder="Current employer" value={form.current_company} onChange={e => setForm(f => ({ ...f, current_company: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label>Cover Letter *</label>
                    <textarea required placeholder="Tell us why you're the right fit..." value={form.cover_letter} onChange={e => setForm(f => ({ ...f, cover_letter: e.target.value }))} />
                  </div>
                  <div>
                    <label>Upload CV / Resume * (PDF only, max 5MB)</label>
                    <div className={`cr-upload-box ${cvFile ? "has-file" : ""}`}
                      onClick={() => document.getElementById("cv-upload").click()}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setCvFile(f); }}
                    >
                      {cvFile ? (
                        <>
                          <div className="cr-upload-icon"><i className="fas fa-file-pdf"></i></div>
                          <div className="cr-upload-filename">{cvFile.name}</div>
                          <button type="button" className="cr-upload-remove" onClick={e => { e.stopPropagation(); setCvFile(null); }}>Remove file</button>
                        </>
                      ) : (
                        <>
                          <div className="cr-upload-icon"><i className="fas fa-cloud-upload-alt"></i></div>
                          <div className="cr-upload-text"><strong>Click to upload</strong> or drag & drop</div>
                          <div className="cr-upload-hint">PDF files only, max 5MB</div>
                        </>
                      )}
                    </div>
                    <input id="cv-upload" type="file" accept=".pdf" style={{ display: "none" }} onChange={e => setCvFile(e.target.files[0])} />
                  </div>
                  <button type="submit" className="cr-submit-btn" disabled={submitting}>
                    {submitting ? "Submitting..." : <>Submit Application <i className="fas fa-paper-plane" style={{ marginLeft: 8 }}></i></>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
