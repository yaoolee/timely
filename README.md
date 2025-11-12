# Timely

Timely is a full‑stack appointment booking app for students and tutors. It supports secure auth with httpOnly cookies, browsing services, booking/rescheduling/canceling sessions, and an admin dashboard to manage services, time slots, users, and view all appointments.

## Deployment

[Live on Vercel](https://timely-frontend-steel.vercel.app/)

## Features

- Authentication
	- Register/Login with httpOnly cookie sessions 
	- Friendly error messages and secure defaults (helmet, CORS, cookie-parser)
- Booking flow (students)
	- Pick a date and time, confirm booking
	- View “My Dashboard” to list, reschedule, and cancel appointments in real time
	- “Book New Session” shortcut from dashboard
- Services
	- Browse service catalog (name, duration, price, instructor)
- Admin dashboard 
	- Services: Create, Update, Delete
	- Time Slots: Create, View, Delete 
	- Appointments: View all, cancel
	- Users: View all, update name/role (promote to admin), delete (with confirmation; also frees associated time slots)

## Tech stack

- Frontend: React + Vite, React Router, Axios
- Backend: Node.js, Express, Mongoose (MongoDB)
- API: SendGrid
- Security/tooling: httpOnly cookies (JWT), CORS, helmet, morgan, dotenv, Prettier, ESLint

## Project structure

```
backend/
	server.js
	routes/ (auth, services, timeslots, appointments, users)
	models/ (User, Service, TimeSlot, Appointment)
frontend/
	src/
		pages/ (Landing, Service, Booking, UserBoard, AdminBoard)
		components/ (Header, Footer, ServiceCard, Button)
		auth/ (AuthContext, ProtectedRoute, AdminRoute)
```

## Environment variables

Backend (`backend/.env`)
- MONGODB_URI=mongodb://127.0.0.1:27017/timely
- JWT_SECRET=replace-with-strong-secret
- PORT=5050
- CLIENT_URL=http://localhost:5173


Frontend (`frontend/.env`)
- VITE_API_URL=http://localhost:5050/api (optional; otherwise use Vite proxy)

## Install & run

Backend
```sh
cd backend
npm install
npm run dev
```

Frontend
```sh
cd frontend
npm install
npm run dev
```

Open the app
- Frontend: http://localhost:5173
- API base: http://localhost:5050/api

## Admin access

Promote users via API (requires an existing admin)
- POST `/api/auth/promote` with `{ email }` or `{ userId }`

The header shows “Admin” only for admins and “My Dashboard” only for logged-in non-admin users.

## Booking notes

- Quick booking endpoint: `POST /api/appointments/quick` with `{ serviceId, date: YYYY-MM-DD, startTime: e.g. "9:00 AM" }`.
- Full booking with time slots: create timeslots in Admin, then `POST /api/appointments` with `{ serviceId, timeSlotId }`.
- User dashboard endpoints:
	- `GET /api/appointments/me`
	- `PUT /api/appointments/:id/reschedule` with `{ timeSlotId }`
	- `DELETE /api/appointments/:id`

## Formatting & linting

Run Prettier in each app
```sh
cd frontend && npm run format
cd ../backend && npm run format
```

## Troubleshooting

- 403 on port 5000 due to macOS AirPlay: the API runs on `PORT=5050` to avoid conflicts.
- Cookies/CORS: Axios is configured with `withCredentials: true`. Ensure `CLIENT_URL` and CORS settings match your frontend origin.
- If “Missing fields” appears during quick booking, make sure `serviceId`, `date`, and `startTime` are present. The Booking page also prompts to pick a service first if missing.


