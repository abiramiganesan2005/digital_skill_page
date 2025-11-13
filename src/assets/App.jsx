
import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";

export default function App() {
  const [open, setOpen] = useState(false);

  // Lock body scrolling when panel is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="landing-root">
      <header className="topbar">
        <div className="brand">
          {/* If you added a logo file to public/logo.svg it will use that */}
          <img src="/logo.svg" alt="logo" className="logo-img" onError={(e)=>{e.target.style.display='none';}} />
          <div className="logo" aria-hidden="true">DF</div>

          <div className="brand-text">
            <div className="brand-name">Digital Future</div>
            <div className="brand-sub">infinite possibilities</div>
          </div>
        </div>

        <div className="top-actions">
          <button className="contact-toggle" onClick={() => setOpen(true)}>
            CONTACT
          </button>
        </div>
      </header>

      <main className="hero" id="hero">
        <div className="hero-inner">
          <h1 className="hero-title">
            The future is <span className="accent">fueled by skills</span>
          </h1>
          <p className="hero-sub">We build practical projects, train talent and deliver solutions.</p>
        </div>
      </main>

      {/* Sliding contact panel (from right) */}
      <aside className={`slide-panel ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="panel-head">
          <div>
            <strong>Contact Us</strong>
            <div className="small-muted" style={{marginTop:6}}>Send a message — we'll reply soon.</div>
          </div>
          <button className="panel-close" onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="panel-body">
          <ContactForm onSuccess={() => setOpen(false)} />
        </div>
      </aside>

      {/* translucent overlay when panel open */}
      <div className={`overlay ${open ? "visible" : ""}`} onClick={() => setOpen(false)} />

      <footer className="site-footer">
        <div className="footer-inner">
          <div>© {new Date().getFullYear()} Digital Future — All rights reserved.</div>
          <div className="small-muted">Built with React, Node & MongoDB</div>
        </div>
      </footer>
    </div>
  );
}
