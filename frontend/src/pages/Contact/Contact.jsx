import React, { useState } from "react";
import "./Contact.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { api } from "../../api/client.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErr("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setSending(true);
    setDone(false);
    try {
      await api.post("/contact", form);
      setDone(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Header />
      <div className="contact-page">
        <div className="contact-card">
          <h1>Contact Us</h1>
          <p className="intro">
            Have a question or need help? Send us a message and we’ll respond as soon as possible.
          </p>
          <form onSubmit={submit} className="contact-form">
            <div className="row">
              <input name="name" placeholder="Your name" value={form.name} onChange={onChange} />
              <input
                name="email"
                type="email"
                placeholder="Your email*"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>
            <input name="subject" placeholder="Subject" value={form.subject} onChange={onChange} />
            <textarea
              name="message"
              placeholder="Message*"
              value={form.message}
              onChange={onChange}
              required
              rows={6}
            />
            <button
              type="submit"
              disabled={sending || !form.email || !form.message}
              className="submit-btn"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
            {err && <p className="error">{err}</p>}
            {done && <p className="success">Message sent successfully!</p>}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
