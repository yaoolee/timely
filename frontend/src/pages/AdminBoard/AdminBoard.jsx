import React, { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./AdminBoard.css";
import { api } from "../../api/client.js";

function addMinutes(hhmm, minutes) {
  const [h, m] = (hhmm || "00:00").split(":").map(Number);
  const total = h * 60 + m + Number(minutes || 0);
  const hh = String(Math.floor(total / 60) % 24).padStart(2, "0");
  const mm = String(total % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

export default function AdminBoard() {
  const [services, setServices] = useState([]);
  const [svcForm, setSvcForm] = useState({ id: "", name: "", description: "", duration: "", price: "", instructorName: "", instructorTitle: "" });
  const [slots, setSlots] = useState([]);
  const [slotForm, setSlotForm] = useState({ serviceId: "", date: "", startTime: "", endTime: "" });
  const [appointments, setAppointments] = useState([]);
  const [tab, setTab] = useState("services");
  const [err, setErr] = useState("");

  const loadServices = async () => {
    const { data } = await api.get("/services");
    setServices(data);
  };
  const loadSlots = async (serviceId) => {
    const { data } = await api.get("/timeslots", { params: { serviceId } });
    setSlots(data);
  };
  const loadAppointments = async () => {
    const { data } = await api.get("/appointments");
    setAppointments(data);
  };

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        await loadServices();
        await loadAppointments();
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load admin data");
      }
    })();
  }, []);

  const startEditService = (s) => {
    setSvcForm({
      id: s._id,
      name: s.name || "",
      description: s.description || "",
      duration: s.duration || "",
      price: s.price ?? "",
      instructorName: s.instructorName || "",
      instructorTitle: s.instructorTitle || "",
    });
    setTab("services");
  };

  const submitService = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      const payload = {
        name: svcForm.name,
        description: svcForm.description,
        duration: svcForm.duration === "" ? undefined : Number(svcForm.duration),
        price: svcForm.price === "" ? undefined : Number(svcForm.price),
        instructorName: svcForm.instructorName,
        instructorTitle: svcForm.instructorTitle,
      };
      if (svcForm.id) {
        await api.put(`/services/${svcForm.id}`, payload);
      } else {
        await api.post("/services", payload);
      }
      setSvcForm({ id: "", name: "", description: "", duration: "", price: "", instructorName: "", instructorTitle: "" });
      await loadServices();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Failed to save service");
    }
  };

  const deleteService = async (id) => {
    try {
      setErr("");
      await api.delete(`/services/${id}`);
      await loadServices();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to delete service");
    }
  };

  const onSlotServiceChange = async (serviceId) => {
    setSlotForm((f) => ({ ...f, serviceId }));
    if (serviceId) {
      await loadSlots(serviceId);
    } else {
      setSlots([]);
    }
  };

  const prefEndTime = useMemo(() => {
    const svc = services.find((s) => s._id === slotForm.serviceId);
    const dur = svc?.duration || 60;
    if (slotForm.startTime) {
      return addMinutes(slotForm.startTime, dur);
    }
    return slotForm.endTime || "";
  }, [slotForm.serviceId, slotForm.startTime, slotForm.endTime, services]);

  const submitSlot = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      const svc = services.find((s) => s._id === slotForm.serviceId);
      const duration = svc?.duration || 60;
      const endTime = slotForm.endTime || addMinutes(slotForm.startTime, duration);
      await api.post("/timeslots", {
        serviceId: slotForm.serviceId,
        date: slotForm.date,
        startTime: slotForm.startTime,
        endTime,
      });
      await loadSlots(slotForm.serviceId);
      setSlotForm((f) => ({ ...f, date: "", startTime: "", endTime: "" }));
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Failed to create time slot");
    }
  };

  const deleteSlot = async (id) => {
    try {
      setErr("");
      await api.delete(`/timeslots/${id}`);
      if (slotForm.serviceId) await loadSlots(slotForm.serviceId);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to delete time slot");
    }
  };

  const cancelAppointment = async (id) => {
    try {
      setErr("");
      await api.delete(`/appointments/${id}`);
      await loadAppointments();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to cancel appointment");
    }
  };

  return (
    <>
      <Header />
      <div className="adminboard">
        <h1>Admin Dashboard</h1>
        {err && <p style={{ color: "#d33", margin: "10px 0" }}>{err}</p>}

        <div className="tabs">
          <button className={tab === "services" ? "active" : ""} onClick={() => setTab("services")}>
            Services
          </button>
          <button className={tab === "timeslots" ? "active" : ""} onClick={() => setTab("timeslots")}>
            Time Slots
          </button>
          <button className={tab === "appointments" ? "active" : ""} onClick={() => setTab("appointments")}>
            Appointments
          </button>
        </div>

        {tab === "services" && (
          <div className="panel">
            <h2>Manage Services</h2>
            <form className="grid" onSubmit={submitService}>
              <input placeholder="Name" value={svcForm.name} onChange={(e) => setSvcForm({ ...svcForm, name: e.target.value })} />
              <input placeholder="Duration (min)" type="number" value={svcForm.duration} onChange={(e) => setSvcForm({ ...svcForm, duration: e.target.value })} />
              <input placeholder="Price" type="number" value={svcForm.price} onChange={(e) => setSvcForm({ ...svcForm, price: e.target.value })} />
              <input placeholder="Instructor Name" value={svcForm.instructorName} onChange={(e) => setSvcForm({ ...svcForm, instructorName: e.target.value })} />
              <input placeholder="Instructor Title" value={svcForm.instructorTitle} onChange={(e) => setSvcForm({ ...svcForm, instructorTitle: e.target.value })} />
              <input placeholder="Description" value={svcForm.description} onChange={(e) => setSvcForm({ ...svcForm, description: e.target.value })} />
              <div className="row">
                <button type="submit">{svcForm.id ? "Update" : "Create"}</button>
                {svcForm.id && (
                  <button type="button" onClick={() => setSvcForm({ id: "", name: "", description: "", duration: "", price: "", instructorName: "", instructorTitle: "" })}>
                    Reset
                  </button>
                )}
              </div>
            </form>

            <ul className="list">
              {services.map((s) => (
                <li key={s._id} className="item">
                  <div className="item-main">
                    <strong>{s.name}</strong>
                    <span>{s.duration} min • ${s.price ?? 0}</span>
                    <span>{s.instructorName} {s.instructorTitle ? `• ${s.instructorTitle}` : ""}</span>
                  </div>
                  <div className="actions">
                    <button onClick={() => startEditService(s)}>Edit</button>
                    <button onClick={() => deleteService(s._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "timeslots" && (
          <div className="panel">
            <h2>Manage Time Slots</h2>
            <form className="grid" onSubmit={submitSlot}>
              <select value={slotForm.serviceId} onChange={(e) => onSlotServiceChange(e.target.value)}>
                <option value="">Select service</option>
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <input type="date" value={slotForm.date} onChange={(e) => setSlotForm({ ...slotForm, date: e.target.value })} />
              <input type="time" value={slotForm.startTime} onChange={(e) => setSlotForm({ ...slotForm, startTime: e.target.value })} />
              <input type="time" value={prefEndTime} onChange={(e) => setSlotForm({ ...slotForm, endTime: e.target.value })} />
              <button type="submit" disabled={!slotForm.serviceId || !slotForm.date || !slotForm.startTime}>
                Add Slot
              </button>
            </form>

            <ul className="list">
              {slots.map((sl) => (
                <li key={sl._id} className="item">
                  <div className="item-main">
                    <strong>{sl.date}</strong>
                    <span>{sl.startTime} - {sl.endTime}</span>
                    <span>{sl.isBooked ? "Booked" : "Open"}</span>
                  </div>
                  <div className="actions">
                    <button onClick={() => deleteSlot(sl._id)} disabled={sl.isBooked}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "appointments" && (
          <div className="panel">
            <h2>All Appointments</h2>
            <ul className="list">
              {appointments.map((a) => (
                <li key={a._id} className="item">
                  <div className="item-main">
                    <strong>{a?.serviceId?.name || "Service"}</strong>
                    <span>{a?.userId?.email || a?.userId?.name || "User"}</span>
                    <span>{a?.timeSlotId?.date} • {a?.timeSlotId?.startTime} - {a?.timeSlotId?.endTime}</span>
                    <span className={`status ${a.status}`}>{a.status}</span>
                  </div>
                  <div className="actions">
                    <button onClick={() => cancelAppointment(a._id)}>Cancel</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}