# 🧠 MiniRedis
### Your Own In-Memory Key-Value Store & Modern Dashboard

MiniRedis is a lightweight, Redis-inspired key-value store built from scratch in Go, now featuring a beautiful React dashboard for easy key management.
It supports core Redis features including string and hash operations, TTL expiration, persistence, and both CLI and web UI access — all without external dependencies.

---

## ⚙️ Features

- 🔑 `SET`, `GET`, `DEL` — Basic string key-value storage
- 🧱 `HSET`, `HGET`, `HDEL` — Hash map support (`map<string, string>`)
- ⏱️ `EX` for TTL — Expire keys after `n` seconds
- 💾 `SAVE` and `LOAD` — File-based persistence to/from JSON
- 🧩 `HSET` supports multiple field-value pairs
- 🌐 TCP Server — Accepts client connections over `localhost:6379`
- 🖥️ **Modern React Dashboard** — Visualize, search, add, and delete keys and fields
- 🧼 Clean, modular structure for easy scaling and maintenance

---

## 🗂️ Project Structure

```text
mini-redis/
├── main.go                    # Starts TCP server and HTTP REST API
├── commands/
│   ├── string.go              # Handles string commands (SET, GET, DEL, SAVE, LOAD)
│   └── hash.go                # Handles hash commands (HSET, HGET, HDEL)
├── api/
│   └── handlers.go            # HTTP REST API endpoints for dashboard
├── store/
│   └── store.go               # Shared data maps, TTL logic, and persistence
├── dashboard/
│   ├── src/
│   │   ├── App.jsx            # Main React app
│   │   └── components/
│   │       ├── Sidebar.jsx    # Sidebar: key browsing & search
│   │       ├── KeyDetail.jsx  # Key details, copy/delete, field management
│   │       └── AddKeyModal.jsx# Modal for adding new keys
│   └── ...                    # Other React files, assets, etc.
└── dump.json                  # JSON persistence file
```

---

## 🚀 Getting Started

### Backend (Go Server)

```bash
git clone https://github.com/cyriljohn147/Mini-Redis-Project.git
cd Mini-Redis-Project
go run main.go
```

- The Go server starts both a TCP server (Redis-like CLI support) and an HTTP API (`localhost:8080`) for the dashboard.

### Frontend (React Dashboard)

```bash
cd dashboard
npm install
npm start
```

- Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).
- Make sure the Go backend is running!

---

## 💻 Supported Commands

**String Commands**
```text
SET key value
GET key
DEL key
SET key value EX 10     # expires in 10 seconds
SAVE                    # writes state to dump.json
LOAD                    # restores from dump.json
```

**Hash Commands**
```text
HSET user:1 name Alice age 23 country India
HGET user:1 name
HDEL user:1 age
```

- All of the above are available via TCP, HTTP API, and the web dashboard.

---

## 🖥️ Web Dashboard Features

- Search, browse, and filter keys in a sidebar
- Add new keys (string/hash) with a modal form
- View and copy key values and hash fields
- Delete keys or individual hash fields (with confirmation)
- Visual feedback for save-to-disk actions, loading, and errors

---

## 🛠 Built With
- ✅ Go (Golang) — No external libraries for core server
- 🧠 In-memory maps for speed
- ⌛ time.Time for TTL management
- 🧵 Goroutines for TCP/HTTP client handling
- 📁 JSON for persistence
- ⚛️ React (Vite) for the modern dashboard UI

---

## 🤓 Learn by Building

This project is a hands-on way to learn:
- How Redis works under the hood
- Building TCP and REST servers in Go
- Working with in-memory and persistent storage
- Modern React UI state management and modularization

---

## 📜 License

This project is licensed under the MIT License.

---

## ✨ Todo / Future Ideas
- 🔄 Append-only file (AOF) persistence mode
- 🧹 LRU key eviction policy
- 📈 Metrics / Stats for debugging
- 🧪 Unit tests & benchmarking
- 🛡️ Authentication and user access control
- 🐳 Docker support

---

## 🙌 Contribute

Pull requests and issues are welcome! If you found this useful, star ⭐ the repo or share it.

---
