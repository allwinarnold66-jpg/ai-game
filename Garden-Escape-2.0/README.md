# 🌿 Garden Escape 2.0 — 3D Multiplayer Championship Maze

Garden Escape is a real-time, 3D multiplayer tournament game powered by Three.js, React, TypeScript, Express, and persistent WebSockets.

The game is designed for **five separate laptops connected over the internet**:
* **Laptop 1**: Admin / Referee Spectator (controls start, resets, awards keys, oversees live 3D overhead feed)
* **Laptop 2**: HR Team (First-person 3D maze, Green corner)
* **Laptop 3**: Marketing Team (First-person 3D maze, Blue corner)
* **Laptop 4**: Finance Team (First-person 3D maze, Yellow corner)
* **Laptop 5**: Operations Team (First-person 3D maze, Red corner)

The four teams solve private workplace scenarios, business cases, and analytical reasoning questions to unlock one-cell movements through a lush 25x25 3D garden maze toward the central Royal Gazebo finish.

---


## 🎮 Two-Level Game Flow

**Level 1 — Business Logic & Data Reasoning** is shown after a player enters their room/team details and before they join the live maze. It has 15 authored questions, a 20-minute countdown, five lives, and three block checkpoints. Questions 5, 10, and 15 are binary yes/no challenges; each correct checkpoint answer unlocks a block. A wrong answer costs one life and the player retries that question. Level 1 must be completed before the player can enter Level 2.

**Level 2 — Existing Garden Escape Maze** is the existing multiplayer maze, question bank, movement system, lives display, and 30-minute race. Admin and projector login are unchanged. There is no Level 3.

## 🛠️ Tech Stack

* **Frontend**: React 19, Three.js (r174), Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
* **Backend**: Node.js, Express, `ws` (persistent WebSocket server), TypeScript (`tsx`)
* **Testing**: Vitest (automated test suite)
* **Architecture**: Server-authoritative state machine (`LOBBY` → `STUDY` (20s) → `RACE` (30m) → `FINISHED`). The race remains active until the 30-minute deadline even if all teams reach the finish early.

---

## 📋 Prerequisites & Node.js Version

* **Node.js**: v22+ LTS recommended (Vite 8 requires a modern Node.js version)
* **npm**: v9+ or v10+

---

## 🚀 Step-by-Step Setup & Quick Start

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and set your secure admin password:
```env
PORT=3000
NODE_ENV=development
ADMIN_PASSWORD=your_secure_password_here
```

### 3. Run in Local Development Mode
Starts the Vite dev server with WebSocket backend:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
Compiles optimized client assets into `dist/`:
```bash
npm run build
```

### 5. Start Production Server
Runs the standalone Express + WebSocket server serving the production bundle:
```bash
npm start
```

### 6. Run Automated Tests
```bash
npm test
```
To run TypeScript linting checks:
```bash
npm run lint
```

---

## 💻 5-Laptop Setup Guide

Ensure all 5 laptops have an active internet or local network connection.

1. **Laptop 1 (Referee / Admin)**:
   * Open the app URL: `https://your-domain.com`
   * Click **Admin Login** in the top-right corner.
   * Enter a room code (the default is `GARDEN123`) and your `ADMIN_PASSWORD`. If the code does not exist yet, successful Admin authentication creates that room.
   * Click **Access Referee Dashboard** and share the same room code with all four teams.
   * You will see the 4 team status slots (`HR`, `MARKETING`, `FINANCE`, `OPERATIONS`).

2. **Laptops 2–5 (The Four Teams)**:
   * **Laptop 2**: Open app URL → Enter the room code created by the Admin → Select **HR** → Enter Player Name → Click **Join 3D Garden Maze**.
   * **Laptop 3**: Open app URL → Enter the room code created by the Admin → Select **MARKETING** → Enter Player Name → Click **Join 3D Garden Maze**.
   * **Laptop 4**: Open app URL → Enter the room code created by the Admin → Select **FINANCE** → Enter Player Name → Click **Join 3D Garden Maze**.
   * **Laptop 5**: Open app URL → Enter the room code created by the Admin → Select **OPERATIONS** → Enter Player Name → Click **Join 3D Garden Maze**.

3. **Starting the Tournament**:
   * Once all 4 teams have joined, the Admin button lights up: **Start Synchronized Game**.
   * **Phase 2 (Study the Maze - 20s)**:
     All 5 laptops enter an elevated 20-second camera overview of the garden maze to study corridors, key locations, and the central finish.
   * **Phase 3 (Race - 30 minutes)**:
     * Player laptops switch to **First-Person 3D Camera**.
     * Admin laptop switches to **Overhead 3D Spectator Camera** showing all 4 team avatars moving simultaneously in real time.
     * Each team receives private questions from their dedicated 50-question bank.
     * Answering correctly (+100 pts) unlocks directional controls (⬆ FORWARD, ⬅ LEFT, ➡ RIGHT, ⬇ BACKWARD).
     * Selecting a valid direction moves the player exactly 1 adjacent maze cell (+10 pts) and immediately delivers the next question.
     * Reaching the Royal Gazebo finish awards +500 points and records the finish timestamp.
   * **Phase 4 (Finished)**:
     When the 30-minute race timer expires, player movement freezes, and the championship podium results are displayed.

---

## 🔒 Security & Privacy Architecture

* **Server-Authoritative**: Clients never report arbitrary coordinates or points. Every move, question validation, key collection, gate unlock, and score award is calculated and validated on the server.
* **Role Exclusivity**: Only 1 player laptop can hold each team role per room. Duplicate role assignments are strictly rejected.
* **Data Segregation & Privacy**:
  * Teams receive **only their own** position, private question, answer feedback, valid directions, and score.
  * Teams **never** receive the other teams' private questions, correct answers, or internal state.
  * The Admin receives an authorized spectator snapshot displaying all 4 teams' positions.
* **Reconnection Support**: Every player receives a secure room-scoped reconnection token saved in `localStorage`. If a laptop disconnects or reloads, clicking **Reconnect** restores the player's team, position, keys, score, checkpoints, and current question without resetting progress.

---

## 🌐 Production Deployment (Persistent WebSockets)

Deploying a real-time WebSocket game requires a host that supports persistent duplex TCP connections (not purely static GitHub Pages).

### Recommended Hosting Providers:
* **Render** (Web Service — Docker or Node.js runtime)
* **Railway**
* **Fly.io**
* **DigitalOcean App Platform** or Droplet
* **AWS ECS / Lightsail**

### Deploying to Render / Railway:
1. Connect your GitHub repository.
2. Set Build Command:
   ```bash
   npm install --legacy-peer-deps && npm run build
   ```
3. Set Start Command:
   ```bash
   npm start
   ```
4. Set Environment Variables:
   * `PORT`: `3000` (or host-assigned port)
   * `NODE_ENV`: `production`
   * `ADMIN_PASSWORD`: `<your-secure-password>`
5. SSL/HTTPS & WSS:
   * Modern cloud hosts (Render, Railway, Fly.io) terminate SSL at their edge proxy, automatically securing `https://` and `wss://`.
   * The client connects seamlessly via standard WebSocket upgrade (`/ws`).

---

## ❓ Troubleshooting

| Issue | Cause & Solution |
| :--- | :--- |
| **"Team role already active"** | Another laptop has already selected that role. Choose an unassigned role or use your saved reconnect token. |
| **"Submissions accepted only during RACE phase"** | The match is either in the Lobby or 20-second Study phase. Wait for the Admin to begin the race. |
| **WebSocket connection fails in production** | Ensure the host supports persistent WebSockets (e.g. Render, Railway, Fly.io). If hosting frontend and backend on different domains, configure `VITE_WS_URL=wss://backend-domain.com/ws`. |
| **Mixed Content warning** | If the site is served over `https://`, WebSockets must connect via `wss://`. The client automatically detects and handles this. |
