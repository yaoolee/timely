import sgMail from "@sendgrid/mail";

const API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "no-reply@timely.local";
const APP_URL = process.env.CLIENT_URL || "http://localhost:5173";

if (API_KEY) {
  sgMail.setApiKey(API_KEY);
}

function to12h(hhmm) {
  if (!hhmm) return "";
  if (/[AP]M$/i.test(hhmm)) return hhmm;
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

export async function sendBookingConfirmation({
  to,
  name,
  serviceName,
  instructorName,
  date,
  startTime,
  endTime,
  appointmentId,
}) {
  if (!API_KEY) {
    console.warn("SENDGRID_API_KEY missing; skipping email send.");
    return;
  }
  const prettyStart = to12h(startTime);
  const prettyEnd = to12h(endTime);

  const subject = "Your Timely Booking is Confirmed";
  const text = `Hi ${name || "there"}, your booking is confirmed:
Service: ${serviceName}
Instructor: ${instructorName || "-"}
Date: ${date}
Time: ${prettyStart}${prettyEnd ? " - " + prettyEnd : ""}

Manage your appointments: ${APP_URL}/dashboard`;

  const html = `
    <div style="font-family:Arial,sans-serif;color:#21212f">
      <h2>Booking Confirmed</h2>
      <p>Hi ${name || "there"},</p>
      <p>Your appointment has been booked successfully.</p>
      <div style="border-top:1px solid #eee;border-bottom:1px solid #eee;padding:12px 0;margin:16px 0">
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Instructor:</strong> ${instructorName || "-"}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${prettyStart}${prettyEnd ? " - " + prettyEnd : ""}</p>
        ${appointmentId ? `<p><strong>ID:</strong> ${appointmentId}</p>` : ""}
      </div>
      <p><a href="${APP_URL}/dashboard" style="color:#6176f7">Manage your appointments</a></p>
      <p>Thanks,<br/>Timely</p>
    </div>
  `;

  const msg = {
    to,
    from: EMAIL_FROM,
    subject,
    text,
    html,
  };
  await sgMail.send(msg);
}

export async function sendContactMessage({ fromEmail, fromName, subject, message }) {
  if (!API_KEY) {
    console.warn("SENDGRID_API_KEY missing; skipping contact email.");
    return;
  }
  const safeSubject = subject || "New Contact Message";
  const html = `
    <div style="font-family:Arial,sans-serif;color:#21212f">
      <h2>Contact Form Message</h2>
      <p><strong>From:</strong> ${fromName || "Anonymous"} &lt;${fromEmail}&gt;</p>
      <p style="white-space:pre-line">${(message || "").replace(/</g, "&lt;")}</p>
      <hr/>
      <p>Reply to: <a href="mailto:${fromEmail}">${fromEmail}</a></p>
    </div>
  `;
  await sgMail.send({
    to: EMAIL_FROM,
    from: EMAIL_FROM,
    subject: safeSubject,
    text: `From: ${fromName} <${fromEmail}>\n\n${message}`,
    html,
  });
}
