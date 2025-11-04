import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./UserBoard.css";
import { api } from "../../api/client.js";
import { useAuth } from "../../auth/useAuth.js";

export default function UserBoard() {
  const { user } = useAuth();
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [reschedulingId, setReschedulingId] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const firstName = (user?.name || user?.username || user?.email || "").split(" ")[0] || "there";

  const load = async () => {
    try {
      setErr("");
      setLoading(true);
      const { data } = await api.get("/appointments/me");
      setAppts(data);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startReschedule = async (appt) => {
    try {
      setErr("");
      setReschedulingId(appt._id);
      setSelectedSlotId("");
      const serviceId = appt.serviceId?._id || appt.serviceId;
      const { data } = await api.get("/timeslots", { params: { serviceId } });
      const available = data.filter((s) => !s.isBooked);
      setSlots(available);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to load timeslots");
    }
  };

  const confirmReschedule = async () => {
    if (!reschedulingId || !selectedSlotId) return;
    try {
      setErr("");
      await api.put(`/appointments/${reschedulingId}/reschedule`, { timeSlotId: selectedSlotId });
      setReschedulingId(null);
      setSlots([]);
      setSelectedSlotId("");
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to reschedule");
    }
  };

  const cancelAppt = async (id) => {
    setErr("");
    setAppts((prev) => prev.filter((a) => a._id !== id)); 
    try {
      await api.delete(`/appointments/${id}`);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to cancel appointment");
      await load(); 
    }
  };

  const fmtDate = (d) => d;
  const fmtTime = (s) => (s ? `${s.startTime} - ${s.endTime}` : "");

  const content = useMemo(() => {
    if (loading) return <p>Loading...</p>;
    if (err) return <p style={{ color: "#d33" }}>{err}</p>;
    if (!appts.length) return <p>No appointments yet.</p>;
    return (
      <ul className="appt-list">
        {appts.map((a) => (
          <li key={a._id} className="appt-item">
            <div className="appt-main">
              <div className="appt-title">
                <strong>{a?.serviceId?.name || "Service"}</strong>
                <span className="instructor">{a?.serviceId?.instructorName || ""}</span>
              </div>
              <div className="appt-meta">
                <span>{fmtDate(a?.timeSlotId?.date)}</span>
                <span>{fmtTime(a?.timeSlotId)}</span>
                <span className={`status ${a.status}`}>{a.status}</span>
              </div>
            </div>
            <div className="appt-actions">
              <button onClick={() => cancelAppt(a._id)}>Cancel</button>
              <button className="btn-reschedule" onClick={() => startReschedule(a)}>Reschedule</button>
            </div>

            {reschedulingId === a._id && (
              <div className="reschedule-panel">
                <select
                  value={selectedSlotId}
                  onChange={(e) => setSelectedSlotId(e.target.value)}
                >
                  <option value="" disabled>
                    Select a new time
                  </option>
                  {slots.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.date} • {s.startTime} - {s.endTime}
                    </option>
                  ))}
                </select>
                <button disabled={!selectedSlotId} onClick={confirmReschedule}>
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setReschedulingId(null);
                    setSlots([]);
                    setSelectedSlotId("");
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appts, loading, err, reschedulingId, slots, selectedSlotId]);

  return (
    <>
      <Header />
      <div className="userboard">
        <h1 className="welcome">Welcome back, {firstName}!</h1>
        <div className="userboard-actions" style={{ marginBottom: 16 }}>
          <Link to="/booking" className="btn-reschedule">Book New Session</Link>
        </div>
        <h2>Upcoming Appointments</h2>
        {content}
      </div>
      <Footer />
    </>
  );
}