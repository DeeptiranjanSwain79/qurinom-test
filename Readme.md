# Store 🛍️

Full-stack e-commerce web application built with **Node.js/Express (backend)** and **React (frontend)**.  
Supports authentication (JWT), Firebase integration, and modern UI.

## 🚀 Project Structure

store/
├── backend/ # Node.js + Express + MongoDB
├── frontend/ # React + Material UI

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/DeeptiranjanSwain79/qurinom-test.git
cd qurinom-test
````

---

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will start on the port you define in `.env` (default: **5000**).

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on **[http://localhost:3000](http://localhost:3000)**

---

## ⚙️ Environment Variables

Create a `.env` file inside **backend/** with the following:

```env
# Server
PORT=5000
API_VERSION=v1

# Database
DB_URI=your_mongodb_connection_uri

# Auth
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=150d
SECRET_KEY=your_secret_key

# Firebase
FB_APIKEY=your_firebase_apikey
FB_AUTHDOMAIN=your_firebase_authdomain
FB_PROJECTID=your_firebase_projectid
FB_STORAGEBUCKET=your_firebase_storagebucket
FB_MESSAGINGSENDERID=your_firebase_messagingsenderid
FB_APPID=your_firebase_appid
FB_MEASUREMENTID=your_firebase_measurementid
```

---

## 📦 Scripts

### Backend

- `npm run dev` → run backend in development with nodemon
- `npm start` → run backend in production

### Frontend

- `npm run dev` → run frontend in development
- `npm run build` → build frontend for production

---
