import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

const API = "http://localhost:4500/api";

const AdminPanel = () => {
  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState("");

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchLeads = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API}/leads`, authHeaders);
      setLeads(res.data);
    } catch (err) {
      setError("Failed to fetch leads. Is backend running?");
    } finally {
      setLoading(false);
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchStats = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API}/admin/stats`, authHeaders);
      setStats(res.data);
    } catch {
      // stats fail silently
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (token) {
      fetchLeads();
      fetchStats();
    }
  }, [token, fetchLeads, fetchStats]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await axios.post(`${API}/auth/login`, loginForm);
      if (res.data.token) {
        localStorage.setItem("admin_token", res.data.token);
        setToken(res.data.token);
      }
    } catch (err) {
      setLoginError(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken("");
    setLeads([]);
    setStats(null);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/leads/${id}`, { status }, authHeaders);
      setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
      fetchStats();
    } catch {
      alert("Failed to update status");
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    try {
      await axios.delete(`${API}/leads/${id}`, authHeaders);
      setLeads((prev) => prev.filter((l) => l._id !== id));
      fetchStats();
    } catch {
      alert("Failed to delete lead");
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchSearch =
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.mobile?.includes(search) ||
      l.pan?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusColor = (s) =>
    ({ New: "#26b9db", Contacted: "#f59e0b", Converted: "#10b981", Rejected: "#ef4444" }[s] || "#999");

  // ─── LOGIN PAGE ───────────────────────────────────────────────
  if (!token) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#1a3a5c,#2a5580)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Helmet><title>Admin Login – Salary Topup</title></Helmet>
      <form onSubmit={handleLogin} style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#1e8a6e,#26b9db)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <span style={{ color: "#fff", fontSize: 22 }}>🔐</span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a3a5c", margin: 0 }}>Admin Login</h2>
          <p style={{ color: "#888", fontSize: 13, marginTop: 4 }}>Salary Topup Dashboard</p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 6 }}>EMAIL</label>
          <input
            type="email" required placeholder="admin@salarytopup.com"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #ddd", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 6 }}>PASSWORD</label>
          <input
            type="password" required placeholder="••••••••"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #ddd", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
          />
        </div>

        {loginError && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "8px 12px", color: "#dc2626", fontSize: 13, marginBottom: 16 }}>
            {loginError}
          </div>
        )}

        <button
          type="submit" disabled={loginLoading}
          style={{ width: "100%", padding: "12px", background: loginLoading ? "#aaa" : "linear-gradient(135deg,#1e8a6e,#26b9db)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loginLoading ? "not-allowed" : "pointer" }}
        >
          {loginLoading ? "Logging in..." : "Login →"}
        </button>
      </form>
    </div>
  );

  // ─── ADMIN DASHBOARD ─────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex" }}>
      <Helmet><title>Admin Dashboard – Salary Topup</title></Helmet>

      {/* Sidebar */}
      <div style={{ width: 220, background: "linear-gradient(180deg,#1a3a5c,#2a5580)", minHeight: "100vh", padding: "24px 0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>Salary Topup</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Admin Panel</div>
        </div>

        {[
          { key: "dashboard", icon: "📊", label: "Dashboard" },
          { key: "leads", icon: "👥", label: "All Leads" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 20px", border: "none",
              background: activeTab === item.key ? "rgba(255,255,255,0.15)" : "transparent",
              color: activeTab === item.key ? "#fff" : "rgba(255,255,255,0.6)",
              cursor: "pointer", fontSize: 14,
              fontWeight: activeTab === item.key ? 700 : 400,
              borderLeft: activeTab === item.key ? "3px solid #26b9db" : "3px solid transparent",
            }}
          >
            <span>{item.icon}</span> {item.label}
          </button>
        ))}

        <div style={{ marginTop: "auto", padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 13 }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "12px 16px", color: "#dc2626", marginBottom: 20, fontSize: 14 }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── DASHBOARD TAB ── */}
        {activeTab === "dashboard" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a3a5c", margin: 0 }}>Dashboard</h1>
              <button
                onClick={() => { fetchLeads(); fetchStats(); }}
                style={{ padding: "8px 16px", background: "#26b9db", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}
              >
                🔄 Refresh
              </button>
            </div>
            <p style={{ color: "#888", marginBottom: 24 }}>Welcome back, Admin</p>

            {/* Stats Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
              {[
                { label: "Total Leads", value: stats?.total ?? 0, icon: "👥", color: "#26b9db" },
                { label: "New Leads", value: stats?.newLeads ?? 0, icon: "🔔", color: "#f59e0b" },
                { label: "Today's Leads", value: stats?.todayLeads ?? 0, icon: "📅", color: "#8b5cf6" },
                { label: "Converted", value: stats?.converted ?? 0, icon: "✅", color: "#10b981" },
              ].map((s) => (
                <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "20px 22px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderTop: `4px solid ${s.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 28, fontWeight: 800, color: "#1a3a5c" }}>{s.value}</div>
                      <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{s.label}</div>
                    </div>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${s.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                      {s.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Leads Table */}
            <div style={{ background: "#fff", borderRadius: 14, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a3a5c", marginBottom: 16 }}>Recent Leads</h3>
              {loading ? (
                <div style={{ textAlign: "center", padding: 40, color: "#888" }}>Loading...</div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                      {["Name", "Mobile", "CIBIL Score", "Source", "Status", "Date"].map((h) => (
                        <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leads.slice(0, 5).map((l) => (
                      <tr key={l._id} style={{ borderBottom: "1px solid #f8f8f8" }}>
                        <td style={{ padding: "10px 10px", fontSize: 14, fontWeight: 600, color: "#1a3a5c" }}>{l.name}</td>
                        <td style={{ padding: "10px 10px", fontSize: 13, color: "#555" }}>{l.mobile}</td>
                        <td style={{ padding: "10px 10px", fontSize: 14, fontWeight: 700, color: l.cibilScore >= 750 ? "#10b981" : l.cibilScore >= 700 ? "#f59e0b" : "#ef4444" }}>{l.cibilScore || "—"}</td>
                        <td style={{ padding: "10px 10px", fontSize: 13, color: "#555" }}>{l.source}</td>
                        <td style={{ padding: "10px 10px" }}>
                          <span style={{ background: `${statusColor(l.status)}20`, color: statusColor(l.status), padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{l.status}</span>
                        </td>
                        <td style={{ padding: "10px 10px", fontSize: 12, color: "#aaa" }}>{new Date(l.createdAt).toLocaleDateString("en-IN")}</td>
                      </tr>
                    ))}
                    {leads.length === 0 && (
                      <tr><td colSpan={6} style={{ textAlign: "center", padding: 24, color: "#aaa" }}>No leads yet</td></tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ── LEADS TAB ── */}
        {activeTab === "leads" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a3a5c" }}>All Leads</h1>
              <button
                onClick={fetchLeads}
                style={{ padding: "8px 16px", background: "#26b9db", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}
              >
                🔄 Refresh
              </button>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
              <input
                placeholder="Search name, mobile, PAN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none" }}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", background: "#fff" }}
              >
                {["All", "New", "Contacted", "Converted", "Rejected"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
              {loading ? (
                <div style={{ textAlign: "center", padding: 40, color: "#888", fontSize: 16 }}>Loading leads...</div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ background: "#f8fafc" }}>
                    <tr>
                      {["Name", "Mobile", "PAN", "CIBIL", "Source", "Status", "Date", "Actions"].map((h) => (
                        <th key={h} style={{ textAlign: "left", padding: "12px 14px", fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((l) => (
                      <tr key={l._id} style={{ borderBottom: "1px solid #f8f8f8" }}>
                        <td style={{ padding: "12px 14px", fontSize: 14, fontWeight: 600, color: "#1a3a5c" }}>{l.name}</td>
                        <td style={{ padding: "12px 14px", fontSize: 13 }}>{l.mobile}</td>
                        <td style={{ padding: "12px 14px", fontSize: 13, fontFamily: "monospace", letterSpacing: 1 }}>{l.pan || "—"}</td>
                        <td style={{ padding: "12px 14px", fontSize: 14, fontWeight: 700, color: l.cibilScore >= 750 ? "#10b981" : l.cibilScore >= 700 ? "#f59e0b" : "#ef4444" }}>{l.cibilScore || "—"}</td>
                        <td style={{ padding: "12px 14px", fontSize: 13, color: "#555" }}>{l.source}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <select
                            value={l.status}
                            onChange={(e) => updateStatus(l._id, e.target.value)}
                            style={{ padding: "4px 8px", borderRadius: 6, border: `1.5px solid ${statusColor(l.status)}`, color: statusColor(l.status), fontWeight: 700, fontSize: 12, background: `${statusColor(l.status)}15`, outline: "none", cursor: "pointer" }}
                          >
                            {["New", "Contacted", "Converted", "Rejected"].map((s) => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: "12px 14px", fontSize: 12, color: "#aaa" }}>{new Date(l.createdAt).toLocaleDateString("en-IN")}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <button
                            onClick={() => deleteLead(l._id)}
                            style={{ background: "#fef2f2", border: "none", color: "#ef4444", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 13 }}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredLeads.length === 0 && (
                      <tr><td colSpan={8} style={{ textAlign: "center", padding: 40, color: "#aaa" }}>No leads found</td></tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
