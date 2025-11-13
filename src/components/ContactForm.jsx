import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function ContactForm({ onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/messages`).then(r => setMessages(r.data)).catch(()=>{});
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!form.name || !form.email || !form.message) { setStatus("All fields are required."); return; }
    if (!validateEmail(form.email)) { setStatus("Please enter a valid email."); return; }

    setLoading(true);
    setStatus("Sending...");
    try {
      const res = await axios.post(`${API_BASE}/contact`, form);
      setStatus(res.data?.message || "Message saved!");
      setForm({ name: "", email: "", message: "" });
      // update messages preview
      try { const r2 = await axios.get(`${API_BASE}/messages`); setMessages(r2.data); } catch {}
      if (typeof onSuccess === "function") onSuccess();
    } catch (err) {
      console.error(err);
      setStatus("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-panel">
      <form onSubmit={handleSubmit} className="contact-form">
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />

        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />

        <label>Message</label>
        <textarea name="message" rows="6" value={form.message} onChange={handleChange} placeholder="How can we help?" />

        <button className="btn" type="submit" disabled={loading}>{loading ? "Sending..." : "Send Message"}</button>
      </form>

      <div style={{marginTop:16}}>
        <h4 style={{margin:0}}>Recent messages</h4>
        <div className="message-box">
          {messages.slice(0,5).map(m => (
            <div className="message-item" key={m._id}>
              <strong>{m.name}</strong> — <small>{new Date(m.date).toLocaleString()}</small>
              <div className="small-muted">{m.email}</div>
              <div style={{marginTop:6}}>{m.message}</div>
            </div>
          ))}
        </div>
      </div>

      {status && <div className="status-text">{status}</div>}
    </div>
  );
}
