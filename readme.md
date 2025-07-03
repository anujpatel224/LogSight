# Log Ingestion and Querying System

A full-stack application to ingest, persist, and query logs using Node.js for the backend and React (with Vite) for the frontend. Logs are stored as daily JSON files, and a user-friendly UI provides filtering and viewing capabilities.

---

### Dev Tools
- Docker & Docker Compose
---

## 📦 NPM Packages Used

### Backend (`server`)

- express
- cors
- zod

### Frontend (`client`)

- vite
- axios

---

## 📁 Project Structure

```
project-root/
├── client/             # React frontend (Vite)
│   ├── src/
│   ├── vite.config.js
│   ├── Dockerfile
├── server/             # Node backend
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   ├── validators/
│   ├── logs/           # Daily log files stored here
│   ├── server.js
│   ├── Dockerfile
├── docker-compose.yml
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd project-root
```

### 2. Run with Docker Compose

```bash
docker-compose up --build
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## 🧪 API Endpoints

### `POST /logs`

Ingest a new log entry.

#### Request Body:

```json
{
  "level": "error",
  "message": "Failed to connect.",
  "resourceId": "server-1234",
  "timestamp": "2025-07-03T12:00:00Z",
  "traceId": "abc-xyz-001",
  "spanId": "span-001",
  "commit": "5e5342f",
  "metadata": { "parentResourceId": "server-9999" }
}
```

### `GET /logs`

Query logs using filters.

#### Query Parameters:

- `level` = error | warn | info | debug
- `message` = partial/fuzzy match
- `resourceId` = partial/fuzzy match
- `timestamp_start`, `timestamp_end` = ISO date

---

## 📦 Features

### ✅ Backend

- JSON file-based daily storage: `logs/log.DD-MM-YYYY.json`
- Zod validation for log schema
- Fuzzy search (message & resourceId)

### ✅ Frontend

- React-based UI
- FilterBar with:
  - Text search (message)
  - Dropdown (level)
  - Text input (resourceId)
  - Date range selector
- Logs displayed with colored badges and formatted timestamps
- Loader while logs are loading

### ✅ Dev Environment

- Dockerized frontend & backend
- Vite development server
- File persistence using Docker volumes

---

## 🐳 Docker Tips

### Vite Dev Server (Frontend)

Ensure `vite.config.js` contains:

```js
export default {
  server: {
    host: '0.0.0.0',
    port: 5173
  }
};
```
otherwise frontend application won't work as its not exposed

### docker-compose.yml Ports

```yaml
frontend:
  ports:
    - '5173:5173'
backend:
  ports:
    - '5000:5000'
```

---

## 📌 ⏱️ Note: Due to time constraints, the below enhancements wasn't implemented

- WebSocket for Live Logs
- pagination
- could have used better date range picker
---

